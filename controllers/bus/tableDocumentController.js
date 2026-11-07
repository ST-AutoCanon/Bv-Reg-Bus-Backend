
import fs from "node:fs/promises";
import JSZip from "jszip";

import Table1A from "../../mongoSchemas/bus/Table1A.js";
import Table3A from "../../mongoSchemas/bus/Table3A.js";
import Table11 from "../../mongoSchemas/bus/Table11.js";

import Field from "../../data/config/fields.json" with { type: "json" };

import {
  getTableDocument,
  getAllTableDocuments,
} from "../../config/tableDocument.js";

import { renderTableDocx } from "../../services/bus/docTableService.js";

/*
|--------------------------------------------------------------------------
| TABLE MODELS
|--------------------------------------------------------------------------
*/

const TABLE_MODELS = {
  table1A: Table1A,
  table3A: Table3A,
  table11: Table11,
};

/*
|--------------------------------------------------------------------------
| GET AUTH USER ID
|--------------------------------------------------------------------------
*/

const getUserId = (req) => {
  return (
    req.userId ||
    req.user?._id ||
    req.user?.id ||
    req.user?.userId ||
    req.auth?.userId ||
    req.auth?.id
  );
};

/*
|--------------------------------------------------------------------------
| GET TABLE MODEL
|--------------------------------------------------------------------------
*/

const getTableModel = (tableName) => {
  const model = TABLE_MODELS[tableName];

  if (!model) {
    const error = new Error(`Table model not configured for ${tableName}`);

    error.statusCode = 500;

    throw error;
  }

  return model;
};

/*
|--------------------------------------------------------------------------
| GET TABLE DATA FOR SELECTED SUBMISSION
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| Always use:
|
| submissionId + userId
|
| This keeps every request's data isolated.
|
*/

const getTableDataForSubmission = async ({
  tableName,
  submissionId,
  userId,
}) => {
  const Model = getTableModel(tableName);

  const tableData = await Model.findOne({
    submissionId,
    userId,
  }).lean();

  return tableData;
};

/*
|--------------------------------------------------------------------------
| GET FIELD DEFINITIONS FROM fields.json
|--------------------------------------------------------------------------
|
| fields.json is NOT MongoDB.
|
| Example:
|
| {
|   "name": "wheelbase",
|   "label": "Wheelbase",
|   "clauseNumber": "1.3",
|   "tables": ["table1A"]
| }
|
*/

const getFieldDefinitions = () => {
  /*
   * fields.json may be:
   *
   * [
   *   {...},
   *   {...}
   * ]
   *
   * OR:
   *
   * {
   *   "fields": [...]
   * }
   */

  let fields = Field;

  if (Field && !Array.isArray(Field) && Array.isArray(Field.fields)) {
    fields = Field.fields;
  }

  if (!Array.isArray(fields)) {
    throw new Error(
      "Invalid fields.json format. Expected an array of field definitions.",
    );
  }

  /*
   * Only fields that have a clauseNumber
   * are useful for DOCX clause mapping.
   */

  const validFields = fields.filter(
    (field) =>
      field && typeof field === "object" && field.name && field.clauseNumber,
  );

  console.log("==================================================");

  console.log("[DOCX] FIELD DEFINITIONS LOADED:", validFields.length);

  console.log("==================================================");

  console.log("[DOCX] Clause mappings:");

  for (const field of validFields) {
    console.log({
      name: field.name,
      label: field.label,
      clauseNumber: field.clauseNumber,
      tables: field.tables,
    });
  }

  console.log("==================================================");

  return validFields;
};

/*
|--------------------------------------------------------------------------
| GET TABLE-SPECIFIC FIELD DEFINITIONS
|--------------------------------------------------------------------------
*/

const getFieldsForTable = (fields, tableName) => {
  return fields.filter((field) => {
    /*
     * If tables is present, the field must belong
     * to the requested table.
     */

    if (Array.isArray(field.tables)) {
      return field.tables.includes(tableName);
    }

    /*
     * If a field has no tables property,
     * don't use it for DOCX mapping.
     */

    return false;
  });
};

/*
|--------------------------------------------------------------------------
| GET TABLE DOCUMENT STATUSES
|--------------------------------------------------------------------------
*/

export const getTableDocumentStatuses = async (req, res) => {
  try {
    const submissionId = req.params.id;

    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    if (!submissionId) {
      return res.status(400).json({
        message: "Submission ID is required.",
      });
    }

    const documents = await Promise.all(
      getAllTableDocuments().map(async (document) => {
        const tableData = await getTableDataForSubmission({
          tableName: document.key,

          submissionId,

          userId,
        });

        return {
          key: document.key,

          label: document.label,

          fileName: document.fileName,

          exists: Boolean(tableData),

          status: tableData?.status || "not_started",

          completionPercentage: tableData?.completionPercentage ?? 0,
        };
      }),
    );

    return res.status(200).json({
      success: true,

      submissionId,

      data: documents,
    });
  } catch (error) {
    console.error("Get table document statuses error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,

      message: error.message || "Failed to get table documents.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DOWNLOAD ONE TABLE DOCUMENT
|--------------------------------------------------------------------------
*/

export const downloadTableDocument = async (req, res) => {
  try {
    const submissionId = req.params.id;

    const tableName = req.params.tableName;

    const userId = getUserId(req);

    /*
     * ---------------------------------------------------------------
     * Authentication
     * ---------------------------------------------------------------
     */

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    /*
     * ---------------------------------------------------------------
     * Submission ID
     * ---------------------------------------------------------------
     */

    if (!submissionId) {
      return res.status(400).json({
        message: "Submission ID is required.",
      });
    }

    /*
     * ---------------------------------------------------------------
     * Validate table
     * ---------------------------------------------------------------
     */

    const document = getTableDocument(tableName);

    /*
     * ---------------------------------------------------------------
     * Get ONLY selected submission's table data
     * ---------------------------------------------------------------
     */

    const tableData = await getTableDataForSubmission({
      tableName,

      submissionId,

      userId,
    });

    if (!tableData) {
      return res.status(404).json({
        success: false,

        message: `${document.label} data was not found for this request.`,
      });
    }

    /*
     * ---------------------------------------------------------------
     * Load fields.json
     * ---------------------------------------------------------------
     */

    const fields = getFieldDefinitions();

    /*
     * ---------------------------------------------------------------
     * Get fields belonging to this table
     * ---------------------------------------------------------------
     */

    const tableFields = getFieldsForTable(fields, tableName);

    console.log("==================================================");

    console.log(`[DOCX] ${tableName} FIELD COUNT:`, tableFields.length);

    console.log(`[DOCX] ${tableName} FIELDS:`);

    for (const field of tableFields) {
      console.log({
        name: field.name,

        label: field.label,

        clauseNumber: field.clauseNumber,

        tables: field.tables,
      });
    }

    console.log("==================================================");

    /*
     * ---------------------------------------------------------------
     * Read original DOCX template
     * ---------------------------------------------------------------
     */

    const templateBuffer = await fs.readFile(document.template);

    /*
     * ---------------------------------------------------------------
     * Render DOCX
     *
     * fields comes directly from fields.json.
     * ---------------------------------------------------------------
     */

    const outputBuffer = await renderTableDocx({
      templateBuffer,

      tableName,

      tableData,

      submissionId,

      fields,
    });

    /*
     * ---------------------------------------------------------------
     * Download filename
     * ---------------------------------------------------------------
     */

    const safeFileName = `${document.key}-${submissionId}.docx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeFileName}"`,
    );

    res.setHeader("Content-Length", outputBuffer.length);

    return res.send(outputBuffer);
  } catch (error) {
    console.error("Download table document error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,

      message: error.message || "Failed to download table document.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DOWNLOAD ALL TABLE DOCUMENTS
|--------------------------------------------------------------------------
|
| Creates ONE ZIP containing:
|
| Table1A.docx
| Table3A.docx
| Table11.docx
|
| All documents use the SAME selected submissionId.
|
*/

export const downloadAllTableDocuments = async (req, res) => {
  try {
    const submissionId = req.params.id;

    const userId = getUserId(req);

    /*
     * ---------------------------------------------------------------
     * Authentication
     * ---------------------------------------------------------------
     */

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }

    /*
     * ---------------------------------------------------------------
     * Submission ID
     * ---------------------------------------------------------------
     */

    if (!submissionId) {
      return res.status(400).json({
        message: "Submission ID is required.",
      });
    }

    /*
     * ---------------------------------------------------------------
     * Load fields.json ONCE
     * ---------------------------------------------------------------
     */

    const fields = getFieldDefinitions();

    /*
     * ---------------------------------------------------------------
     * Create ZIP
     * ---------------------------------------------------------------
     */

    const outputZip = new JSZip();

    let documentCount = 0;

    /*
     * ---------------------------------------------------------------
     * Process every configured table
     * ---------------------------------------------------------------
     */

    for (const document of getAllTableDocuments()) {
      const tableName = document.key;

      console.log("==================================================");

      console.log(`[DOCX ZIP] Processing ${tableName}`);

      console.log(`[DOCX ZIP] Submission ID: ${submissionId}`);

      console.log(`[DOCX ZIP] User ID: ${userId}`);

      /*
       * -------------------------------------------------------------
       * Fetch selected submission's table data
       * -------------------------------------------------------------
       */

      const tableData = await getTableDataForSubmission({
        tableName,

        submissionId,

        userId,
      });

      /*
       * -------------------------------------------------------------
       * If table doesn't exist,
       * don't add it to ZIP.
       * -------------------------------------------------------------
       */

      if (!tableData) {
        console.log(`[DOCX ZIP] ${tableName}: No data found`);

        continue;
      }

      /*
       * -------------------------------------------------------------
       * Get fields for this table
       * -------------------------------------------------------------
       */

      const tableFields = getFieldsForTable(fields, tableName);

      console.log(`[DOCX ZIP] ${tableName} FIELD COUNT:`, tableFields.length);

      /*
       * -------------------------------------------------------------
       * Read original DOCX template
       * -------------------------------------------------------------
       */

      const templateBuffer = await fs.readFile(document.template);

      /*
       * -------------------------------------------------------------
       * Render DOCX
       * -------------------------------------------------------------
       */

      const outputBuffer = await renderTableDocx({
        templateBuffer,

        tableName,

        tableData,

        submissionId,

        fields,
      });

      /*
       * -------------------------------------------------------------
       * Add generated DOCX to ZIP
       * -------------------------------------------------------------
       */

      outputZip.file(
        document.fileName,

        outputBuffer,
      );

      documentCount++;

      console.log(`[DOCX ZIP] ${tableName}: Added to ZIP`);

      console.log("==================================================");
    }

    /*
     * ---------------------------------------------------------------
     * No documents found
     * ---------------------------------------------------------------
     */

    if (documentCount === 0) {
      return res.status(404).json({
        success: false,

        message: "No table data was found for this request.",
      });
    }

    /*
     * ---------------------------------------------------------------
     * Generate ZIP
     * ---------------------------------------------------------------
     */

    const zipBuffer = await outputZip.generateAsync({
      type: "nodebuffer",

      compression: "DEFLATE",

      compressionOptions: {
        level: 6,
      },
    });

    /*
     * ---------------------------------------------------------------
     * ZIP filename
     * ---------------------------------------------------------------
     */

    const fileName = `submission-${submissionId}-tables.zip`;

    /*
     * ---------------------------------------------------------------
     * Response headers
     * ---------------------------------------------------------------
     */

    res.setHeader("Content-Type", "application/zip");

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    res.setHeader("Content-Length", zipBuffer.length);

    /*
     * ---------------------------------------------------------------
     * Send ZIP
     * ---------------------------------------------------------------
     */

    return res.send(zipBuffer);
  } catch (error) {
    console.error("Download all table documents error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,

      message: error.message || "Failed to download table documents.",
    });
  }
};