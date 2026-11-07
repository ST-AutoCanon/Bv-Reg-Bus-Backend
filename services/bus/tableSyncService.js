import Table1A from "../../mongoSchemas/bus/Table1A.js";
import Table11 from "../../mongoSchemas/bus/Table11.js";
import Table3A from "../../mongoSchemas/bus/Table3A.js";

import fields from "../../data/config/fields.json" with { type: "json" };

/*
|--------------------------------------------------------------------------
| TABLE CONFIGURATION
|--------------------------------------------------------------------------
|
| Each table has its own Mongoose model.
|
*/

const TABLE_CONFIG = {
  table1A: Table1A,
  table11: Table11,
  table3A: Table3A,
};

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

/**
 * Check whether a field value is empty.
 */
const isEmptyValue = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
};

/**
 * Get only active fields which belong to a particular table.
 *
 * Example:
 *
 * field.tables = ["table1A", "table11", "table3A"]
 *
 * This field will be included in all three tables.
 */
const getTableFields = (tableId) => {
  return fields.filter(
    (field) =>
      field.isActive &&
      Array.isArray(field.tables) &&
      field.tables.includes(tableId),
  );
};

/**
 * Build the data object for one table.
 *
 * The original submission values are structured like:
 *
 * {
 *   manufacturer: {
 *     manufacturerNameAddress: "...",
 *     manufacturerTelephone: "..."
 *   },
 *
 *   dimensions: {
 *     overallLength: "...",
 *     overallWidth: "..."
 *   }
 * }
 *
 * The table will contain only fields assigned
 * to that particular table.
 */
const buildTableData = (values, tableId) => {
  const tableData = {};

  const tableFields = getTableFields(tableId);

  for (const field of tableFields) {
    const subCategoryId = field.subCategoryId;
    const fieldName = field.name;

    if (!tableData[subCategoryId]) {
      tableData[subCategoryId] = {};
    }

    const value = values?.[subCategoryId]?.[fieldName];

    tableData[subCategoryId][fieldName] = value ?? "";
  }

  return tableData;
};

/**
 * Calculate completion percentage for a table.
 *
 * IMPORTANT:
 * The percentage is calculated using ALL fields
 * assigned to that table.
 *
 * Example:
 *
 * Table1A has 20 fields
 * 15 fields have values
 *
 * Percentage = 75%
 */
const calculateTableCompletion = (values, tableId) => {
  const tableFields = getTableFields(tableId);

  if (tableFields.length === 0) {
    return 0;
  }

  let filledFields = 0;

  for (const field of tableFields) {
    const value = values?.[field.subCategoryId]?.[field.name];

    if (!isEmptyValue(value)) {
      filledFields++;
    }
  }

  return Math.round((filledFields / tableFields.length) * 100);
};

/**
 * Convert percentage into table status.
 */
const getTableStatus = (percentage) => {
  if (percentage === 0) {
    return "not_started";
  }

  if (percentage === 100) {
    return "completed";
  }

  return "in_progress";
};

/*
|--------------------------------------------------------------------------
| SYNC ONE TABLE
|--------------------------------------------------------------------------
*/

/**
 * Create/update one table document.
 *
 * This function works with:
 *
 * Table1A
 * Table11
 * Table3A
 */
const syncOneTable = async ({ submissionId, userId, values, tableId }) => {
  const Model = TABLE_CONFIG[tableId];

  if (!Model) {
    throw new Error(`Unsupported table: ${tableId}`);
  }

  /*
   * Get only fields belonging to this table.
   */
  const data = buildTableData(values, tableId);

  /*
   * Calculate completion percentage.
   */
  const completionPercentage = calculateTableCompletion(values, tableId);

  /*
   * Calculate status.
   */
  const status = getTableStatus(completionPercentage);

  /*
   * Create the document if it does not exist.
   *
   * Update it if it already exists.
   *
   * Because submissionId is unique in each table
   * schema, there will be only one document per
   * submission for each table.
   */
  const table = await Model.findOneAndUpdate(
    {
      submissionId,
    },
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

/**
 * Sync all tables belonging to a submission.
 *
 * This is the main function that should be called
 * from createSubmission() and updateSubmission().
 */
export const syncSubmissionTables = async ({
  submissionId,
  userId,
  values,
}) => {
  /*
   * Sync Table 1A
   */
  const table1A = await syncOneTable({
    submissionId,
    userId,
    values,
    tableId: "table1A",
  });

  /*
   * Sync Table 11
   */
  const table11 = await syncOneTable({
    submissionId,
    userId,
    values,
    tableId: "table11",
  });

  /*
   * Sync Table 3A
   */
  const table3A = await syncOneTable({
    submissionId,
    userId,
    values,
    tableId: "table3A",
  });

  /*
   * Return all three table documents.
   */
  return {
    table1A,
    table11,
    table3A,
  };
};

/*
|--------------------------------------------------------------------------
| OPTIONAL: SYNC ONLY ONE TABLE
|--------------------------------------------------------------------------
|
| This can be useful later if your UI updates only
| one table at a time.
|
*/

export const syncSingleTable = async ({
  submissionId,
  userId,
  values,
  tableId,
}) => {
  return syncOneTable({
    submissionId,
    userId,
    values,
    tableId,
  });
};

export default syncSubmissionTables;
