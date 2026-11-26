import Table1A from "../../mongoSchemas/bus/Table1A.js";

import T2 from "../../mongoSchemas/bus/T2.js";
import T3 from "../../mongoSchemas/bus/T3.js";
import T5 from "../../mongoSchemas/bus/T5.js";
import T6 from "../../mongoSchemas/bus/T6.js";
import T7C from "../../mongoSchemas/bus/T7C.js";
import T8 from "../../mongoSchemas/bus/T8.js";
import T11 from "../../mongoSchemas/bus/T11.js";
import T13 from "../../mongoSchemas/bus/T13.js";
import T22 from "../../mongoSchemas/bus/T22.js";
import T22P1 from "../../mongoSchemas/bus/T22P1.js";
import T22P2 from "../../mongoSchemas/bus/T22P2.js";
import T22B from "../../mongoSchemas/bus/T22B.js";
import T22C from "../../mongoSchemas/bus/T22C.js";
import T22D from "../../mongoSchemas/bus/T22D.js";

import fields from "../../data/config/fields.json" with { type: "json" };

/*
|--------------------------------------------------------------------------
| TABLE CONFIGURATION
|--------------------------------------------------------------------------
*/

const TABLE_CONFIG = {
  table1A: Table1A,
  T2,
  T3,
  T5,
  T6,
  T7C,
  T8,
  T11,
  T13,
  T22,
  T22P1,
  T22P2,
  T22B,
  T22C,
  T22D,
};

// Match longer model names first.
// This ensures T22P1 is checked before T22.
const MODEL_KEYS = Object.keys(TABLE_CONFIG).sort(
  (a, b) => b.length - a.length,
);

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

const isEmptyValue = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};

/**
 * Convert a table identifier into its Mongoose model key.
 *
 * Examples:
 * T2-2    -> T2
 * T7C-1   -> T7C
 * T11-1   -> T11
 * T22-02  -> T22
 * T22P1-1 -> T22P1
 * table1A -> table1A
 */
const getModelKey = (tableId) => {
  return MODEL_KEYS.find(
    (modelKey) => tableId === modelKey || tableId.startsWith(`${modelKey}-`),
  );
};

/**
 * Pair each table identifier with the clause number
 * at the same position.
 */
const getFieldTableMappings = (field) => {
  const tables = Array.isArray(field.tables) ? field.tables : [];

  const clauses = Array.isArray(field.clauseNumber)
    ? field.clauseNumber
    : String(field.clauseNumber ?? "").split(",");

  return tables.map((tableId, index) => {
    const normalizedTableId = String(tableId).trim();

    return {
      tableId: normalizedTableId,
      modelKey: getModelKey(normalizedTableId),
      clauseNumber: String(clauses[index] ?? "").trim(),
    };
  });
};

/**
 * Get active fields belonging to a particular model.
 *
 * A model can receive multiple table identifiers.
 * For example, T2 can receive T2-2, T2-3, etc.
 */
const getTableFields = (modelKey) => {
  return fields
    .filter((field) => field.isActive)
    .map((field) => ({
      field,
      mappings: getFieldTableMappings(field).filter(
        (mapping) => mapping.modelKey === modelKey,
      ),
    }))
    .filter((item) => item.mappings.length > 0);
};

/*
|--------------------------------------------------------------------------
| BUILD TABLE DATA
|--------------------------------------------------------------------------
*/

/**
 * Keep field values in their existing structure.
 *
 * Store clause metadata separately under _clauseNumbers
 * so existing consumers of field values are not changed.
 */
const buildTableData = (values, modelKey) => {
  const tableData = {};
  const clauseNumbers = {};

  const tableFields = getTableFields(modelKey);

  for (const { field, mappings } of tableFields) {
    const subCategoryId = field.subCategoryId;
    const fieldName = field.name;

    if (!tableData[subCategoryId]) {
      tableData[subCategoryId] = {};
    }

    if (!clauseNumbers[subCategoryId]) {
      clauseNumbers[subCategoryId] = {};
    }

    const value = values?.[subCategoryId]?.[fieldName];

    tableData[subCategoryId][fieldName] = value ?? "";

    clauseNumbers[subCategoryId][fieldName] = mappings.map((mapping) => ({
      tableId: mapping.tableId,
      clauseNumber: mapping.clauseNumber,
    }));
  }

  return {
    ...tableData,
    _clauseNumbers: clauseNumbers,
  };
};

/*
|--------------------------------------------------------------------------
| COMPLETION
|--------------------------------------------------------------------------
*/

const calculateTableCompletion = (values, modelKey) => {
  const tableFields = getTableFields(modelKey);

  if (tableFields.length === 0) {
    return 0;
  }

  let filledFields = 0;

  for (const { field } of tableFields) {
    const value = values?.[field.subCategoryId]?.[field.name];

    if (!isEmptyValue(value)) {
      filledFields++;
    }
  }

  return Math.round((filledFields / tableFields.length) * 100);
};

const getTableStatus = (percentage) => {
  if (percentage === 0) return "not_started";
  if (percentage === 100) return "completed";

  return "in_progress";
};

/*
|--------------------------------------------------------------------------
| VALIDATE TABLE MAPPINGS
|--------------------------------------------------------------------------
*/

const validateTableMappings = () => {
  for (const field of fields) {
    if (!field.isActive || !Array.isArray(field.tables)) {
      continue;
    }

    const mappings = getFieldTableMappings(field);

    for (const mapping of mappings) {
      if (!mapping.modelKey) {
        throw new Error(
          `Unsupported table identifier "${mapping.tableId}" in field "${field.id}"`,
        );
      }
    }
  }
};

/*
|--------------------------------------------------------------------------
| SYNC ONE TABLE
|--------------------------------------------------------------------------
*/

const syncOneTable = async ({ submissionId, userId, values, tableId }) => {
  const Model = TABLE_CONFIG[tableId];

  if (!Model) {
    throw new Error(`Unsupported table model: ${tableId}`);
  }

  const data = buildTableData(values, tableId);

  const completionPercentage = calculateTableCompletion(values, tableId);

  const status = getTableStatus(completionPercentage);

  const table = await Model.findOneAndUpdate(
    { submissionId },
    {
      $set: {
        submissionId,
        userId,
        data,
        completionPercentage,
        status,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  return table;
};

/*
|--------------------------------------------------------------------------
| SYNC ALL TABLES
|--------------------------------------------------------------------------
*/

export const syncSubmissionTables = async ({
  submissionId,
  userId,
  values,
}) => {
  // Validate identifiers before writing any table documents.
  validateTableMappings();

  const tableEntries = Object.keys(TABLE_CONFIG);

  const results = await Promise.all(
    tableEntries.map(async (tableId) => {
      const table = await syncOneTable({
        submissionId,
        userId,
        values,
        tableId,
      });

      return [tableId, table];
    }),
  );

  return Object.fromEntries(results);
};

/*
|--------------------------------------------------------------------------
| SYNC ONE SPECIFIC TABLE
|--------------------------------------------------------------------------
*/

export const syncSingleTable = async ({
  submissionId,
  userId,
  values,
  tableId,
}) => {
  if (!TABLE_CONFIG[tableId]) {
    throw new Error(`Unsupported table model: ${tableId}`);
  }

  validateTableMappings();

  return syncOneTable({
    submissionId,
    userId,
    values,
    tableId,
  });
};


// Get saved completion percentages for all BUS tables


export const getSubmissionTableProgress = async (submissionId) => {
  const tableProgress = {};


  await Promise.all(
    Object.entries(TABLE_CONFIG).map(async ([tableKey, Model]) => {
      try {
        const table = await Model.findOne({ submissionId })
          .select("submissionId completionPercentage status")
          .lean();

        console.log(`[Table Progress Debug] ${tableKey}:`, {
          found: !!table,
          submissionId: table?.submissionId ? String(table.submissionId) : null,
          completionPercentage: table?.completionPercentage,
          status: table?.status,
          collection: Model.collection.name,
        });

        tableProgress[tableKey] = {
          _id: table?._id ?? null,
          completionPercentage: table?.completionPercentage ?? 0,
          status: table?.status ?? "not_started",
        };
      } catch (error) {
        console.error(
          `[Table Progress Debug] Error fetching ${tableKey}:`,
          error.message,
        );

        tableProgress[tableKey] = {
          _id: null,
          completionPercentage: 0,
          status: "not_started",
        };
      }
    }),
  );

  return tableProgress;
};

export default syncSubmissionTables;
