import JSZip from "jszip";

/* -------------------------------------------------------------------------- */
/* XML HELPERS                                                                */
/* -------------------------------------------------------------------------- */

const escapeXml = (value) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const decodeXml = (value) => {
  return String(value ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
};

const normalizeText = (value) => {
  return decodeXml(String(value ?? ""))
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const normalizeClauseNumber = (value) => {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^0-9.]/g, "");
};

const stripXml = (xml) => {
  return decodeXml(
    String(xml ?? "")
      .replace(/<w:tab\b[^>]*\/?>/g, " ")
      .replace(/<w:br\b[^>]*\/?>/g, "\n")
      .replace(/<[^>]+>/g, ""),
  ).trim();
};

/* -------------------------------------------------------------------------- */
/* DOCX ROW / CELL PARSING                                                    */
/* -------------------------------------------------------------------------- */

const getRows = (documentXml) => {
  return [...String(documentXml).matchAll(/<w:tr\b[\s\S]*?<\/w:tr>/g)];
};

const getCells = (rowXml) => {
  return [...String(rowXml).matchAll(/<w:tc\b[\s\S]*?<\/w:tc>/g)];
};

const getCellText = (cellXml) => {
  return normalizeText(stripXml(cellXml));
};

/* -------------------------------------------------------------------------- */
/* TABLE DATA                                                                  */
/* -------------------------------------------------------------------------- */

const getRawDataObject = (tableData) => {
  if (!tableData) {
    return {};
  }

  if (
    tableData.data &&
    typeof tableData.data === "object" &&
    !Array.isArray(tableData.data)
  ) {
    return tableData.data;
  }

  return {};
};

/* -------------------------------------------------------------------------- */
/* VALUE HELPERS                                                               */
/* -------------------------------------------------------------------------- */

const hasValue = (value) => {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string") {
    return value.trim() !== "";
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return true;
};

const formatValue = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => formatValue(item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => {
        const formatted = formatValue(item);

        if (!formatted) {
          return "";
        }

        return `${key}: ${formatted}`;
      })
      .filter(Boolean)
      .join(", ");
  }

  return String(value);
};

/* -------------------------------------------------------------------------- */
/* FIND VALUE BY FIELD NAME                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Searches recursively inside tableData.data.
 *
 * Example MongoDB data:
 *
 * {
 *   dimensions: {
 *     wheelbase: "33",
 *     generalArrangementVehicle: "Vehicle arrangement..."
 *   },
 *   identification: {
 *     numberSeatingPositions: 5
 *   }
 * }
 */

const findValueByFieldName = (object, fieldName) => {
  if (object === null || object === undefined || !fieldName) {
    return undefined;
  }

  if (typeof object !== "object") {
    return undefined;
  }

  const target = String(fieldName).trim();

  if (Array.isArray(object)) {
    for (const item of object) {
      const found = findValueByFieldName(item, target);

      if (found !== undefined) {
        return found;
      }
    }

    return undefined;
  }

  /* Direct key lookup */
  if (Object.prototype.hasOwnProperty.call(object, target)) {
    const value = object[target];

    if (hasValue(value)) {
      return value;
    }
  }

  /* Case-insensitive fallback */
  const targetLower = target.toLowerCase();

  for (const [key, value] of Object.entries(object)) {
    if (String(key).toLowerCase() === targetLower) {
      if (hasValue(value)) {
        return value;
      }
    }
  }

  /* Recursive lookup */
  for (const value of Object.values(object)) {
    const found = findValueByFieldName(value, target);

    if (found !== undefined) {
      return found;
    }
  }

  return undefined;
};

/* -------------------------------------------------------------------------- */
/* FIELD DEFINITIONS                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Field definitions must contain:
 *
 * {
 *   name: "wheelbase",
 *   label: "Wheelbase",
 *   clauseNumber: "1.3",
 *   tables: ["table1A"]
 * }
 *
 * These definitions should come from your Field collection.
 */

const normalizeFieldDefinition = (field) => {
  if (!field || typeof field !== "object") {
    return null;
  }

  const clauseNumber = normalizeClauseNumber(field.clauseNumber);

  if (!clauseNumber) {
    return null;
  }

  return {
    ...field,
    clauseNumber,
    name: field.name ? String(field.name).trim() : "",
    label: field.label ? String(field.label).trim() : "",
    tables: Array.isArray(field.tables) ? field.tables : [],
  };
};

/* -------------------------------------------------------------------------- */
/* CREATE FIELD MAP                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Creates:
 *
 * "1.3" -> wheelbase
 * "1.0" -> generalArrangementVehicle
 * "1.1" -> typicalVehiclePhotosDrawings
 *
 * No hard-coded field mapping.
 */

const createClauseFieldMap = (fields = [], tableName) => {
  const map = new Map();

  for (const rawField of fields) {
    const field = normalizeFieldDefinition(rawField);

    if (!field) {
      continue;
    }

    /*
     * If the field specifies tables, only use it for the current table.
     */
    if (field.tables.length > 0 && !field.tables.includes(tableName)) {
      continue;
    }

    if (!field.name) {
      continue;
    }

    map.set(field.clauseNumber, field);
  }

  return map;
};

/* -------------------------------------------------------------------------- */
/* FIND VALUE FOR CLAUSE                                                       */
/* -------------------------------------------------------------------------- */

/**
 * DOCX:
 *
 * 1.3 | Wheelbase | [empty]
 *
 * Field:
 *
 * {
 *   name: "wheelbase",
 *   clauseNumber: "1.3"
 * }
 *
 * Mongo:
 *
 * {
 *   dimensions: {
 *     wheelbase: "33"
 *   }
 * }
 *
 * Result:
 *
 * 33
 */

const getValueForClause = ({ tableData, clauseNumber, clauseFieldMap }) => {
  const normalizedClause = normalizeClauseNumber(clauseNumber);

  if (!normalizedClause) {
    return undefined;
  }

  const field = clauseFieldMap.get(normalizedClause);

  if (!field) {
    return undefined;
  }

  const data = getRawDataObject(tableData);

  const value = findValueByFieldName(data, field.name);

  if (value === undefined) {
    return undefined;
  }

  return value;
};

/* -------------------------------------------------------------------------- */
/* CREATE VALUE PARAGRAPH                                                      */
/* -------------------------------------------------------------------------- */

const createValueParagraph = (existingParagraph, value) => {
  const text = escapeXml(formatValue(value));

  const pPrMatch = existingParagraph?.match(/<w:pPr\b[\s\S]*?<\/w:pPr>/);

  const pPr = pPrMatch?.[0] || "";

  const runMatch = existingParagraph?.match(/<w:r\b[\s\S]*?<\/w:r>/);

  let rPr = "";

  if (runMatch) {
    const rPrMatch = runMatch[0].match(/<w:rPr\b[\s\S]*?<\/w:rPr>/);

    rPr = rPrMatch?.[0] || "";
  }

  return `
    <w:p>
      ${pPr}
      <w:r>
        ${rPr}
        <w:t xml:space="preserve">${text}</w:t>
      </w:r>
    </w:p>
  `.replace(/>\s+</g, "><");
};

/* -------------------------------------------------------------------------- */
/* SET LAST CELL VALUE                                                         */
/* -------------------------------------------------------------------------- */

/**
 * IMPORTANT:
 *
 * Only the final/value cell is replaced.
 *
 * The following remain untouched:
 *
 * - clause number
 * - question/label
 * - cell width
 * - borders
 * - shading
 * - alignment
 * - table structure
 */

const setLastCellValue = (rowXml, value) => {
  const cells = getCells(rowXml);

  if (!cells.length) {
    return rowXml;
  }

  const lastCell = cells[cells.length - 1][0];

  /* Preserve cell properties */
  const tcPrMatch = lastCell.match(/<w:tcPr\b[\s\S]*?<\/w:tcPr>/);

  const tcPr = tcPrMatch?.[0] || "";

  /* Preserve existing paragraph formatting */
  const paragraphMatch = lastCell.match(/<w:p\b[\s\S]*?<\/w:p>/);

  const existingParagraph = paragraphMatch?.[0] || "";

  const newParagraph = createValueParagraph(existingParagraph, value);

  const newCell = `<w:tc>${tcPr}${newParagraph}</w:tc>`;

  const lastCellIndex = rowXml.lastIndexOf(lastCell);

  if (lastCellIndex === -1) {
    return rowXml;
  }

  return (
    rowXml.slice(0, lastCellIndex) +
    newCell +
    rowXml.slice(lastCellIndex + lastCell.length)
  );
};

/* -------------------------------------------------------------------------- */
/* GET ROW INFORMATION                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Expected DOCX row:
 *
 * [1.3] [Wheelbase] [empty value]
 *
 * We use ONLY the first cell as the clause identifier.
 */

const getRowInfo = (rowXml) => {
  const cells = getCells(rowXml);

  if (cells.length < 2) {
    return null;
  }

  const serialNumber = getCellText(cells[0][0]);

  const label = getCellText(cells[1][0]);

  if (!serialNumber && !label) {
    return null;
  }

  return {
    clauseNumber: normalizeClauseNumber(serialNumber),
    serialNumber,
    label,
    cellCount: cells.length,
  };
};

/* -------------------------------------------------------------------------- */
/* PATCH DOCUMENT XML                                                          */
/* -------------------------------------------------------------------------- */

const patchDocumentXml = ({ documentXml, tableData, tableName, fields }) => {
  const rows = getRows(documentXml);

  let updatedXml = documentXml;

  let matchedRows = 0;

  /*
   * Create dynamic clause -> field mapping.
   *
   * Example:
   *
   * 1.0 -> generalArrangementVehicle
   * 1.1 -> typicalVehiclePhotosDrawings
   * 1.2 -> completeVehicleDrawing
   * 1.3 -> wheelbase
   * 1.4 -> numberAxlesWheels
   * 1.5 -> enginePositionArrangement
   * 1.6 -> numberSeatingPositions
   */

  const clauseFieldMap = createClauseFieldMap(fields, tableName);

  console.log(
    `[DOCX] ${tableName} field mappings:`,
    [...clauseFieldMap.entries()].map(([clause, field]) => ({
      clause,
      name: field.name,
      label: field.label,
    })),
  );

  /*
   * Process bottom-to-top so XML replacement
   * does not affect row positions.
   */

  for (let index = rows.length - 1; index >= 0; index--) {
    const rowXml = rows[index][0];

    const rowInfo = getRowInfo(rowXml);

    if (!rowInfo) {
      continue;
    }

    /*
     * Normal data row:
     *
     * [clause] [question] [value]
     */

    if (rowInfo.cellCount < 3) {
      continue;
    }

    if (!rowInfo.clauseNumber) {
      continue;
    }

    /*
     * Find field by clause number.
     */

    const field = clauseFieldMap.get(rowInfo.clauseNumber);

    if (!field) {
      continue;
    }

    /*
     * Find MongoDB value using field.name.
     */

    const value = getValueForClause({
      tableData,
      clauseNumber: rowInfo.clauseNumber,
      clauseFieldMap,
    });

    if (value === undefined || value === null) {
      continue;
    }

    /*
     * Do not overwrite with empty string.
     */

    if (typeof value === "string" && value.trim() === "") {
      continue;
    }

    const updatedRow = setLastCellValue(rowXml, value);

    if (updatedRow === rowXml) {
      continue;
    }

    matchedRows++;

    updatedXml = updatedXml.replace(rowXml, updatedRow);

    console.log(
      `[DOCX] ${tableName} | ${rowInfo.clauseNumber} | ${field.name} | ${formatValue(value)}`,
    );
  }

  console.log(`[DOCX] ${tableName} | Total rows populated: ${matchedRows}`);

  return updatedXml;
};

/* -------------------------------------------------------------------------- */
/* RENDER TABLE DOCX                                                           */
/* -------------------------------------------------------------------------- */

/**
 * REQUIRED ARGUMENT:
 *
 * fields
 *
 * Example:
 *
 * const fields = await Field.find({
 *   isActive: true
 * }).lean();
 *
 * renderTableDocx({
 *   templateBuffer,
 *   tableName,
 *   tableData,
 *   submissionId,
 *   fields
 * });
 */

export const renderTableDocx = async ({
  templateBuffer,
  tableName,
  tableData,
  submissionId,
  fields = [],
}) => {
  if (!templateBuffer) {
    throw new Error("DOCX template is missing.");
  }

  if (!tableData) {
    throw new Error(`No ${tableName} data found for this submission.`);
  }

  if (!submissionId) {
    throw new Error("Submission ID is required.");
  }

  /*
   * Safety check:
   *
   * Make sure the selected submission's
   * table data is being rendered.
   */

  if (
    tableData.submissionId &&
    String(tableData.submissionId) !== String(submissionId)
  ) {
    throw new Error(
      `Table data does not belong to submission ${submissionId}.`,
    );
  }

  /*
   * Load original DOCX.
   */

  const zip = await JSZip.loadAsync(templateBuffer);

  const documentFile = zip.file("word/document.xml");

  if (!documentFile) {
    throw new Error("Invalid DOCX template: word/document.xml not found.");
  }

  const documentXml = await documentFile.async("string");

  /*
   * Populate only this table's
   * selected submission data.
   */

  const updatedDocumentXml = patchDocumentXml({
    documentXml,
    tableData,
    tableName,
    fields,
  });

  /*
   * Replace ONLY document.xml.
   *
   * All other DOCX files/resources
   * remain untouched.
   */

  zip.file("word/document.xml", updatedDocumentXml);

  return zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  });
};