import path from "path";
import fs from "fs";
import XLSX from "xlsx";
import JSZip from "jszip";
import { fileURLToPath } from "url";

/* =========================================================
   PATHS
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCEL_PATH = path.join(
  __dirname,
  "../templates/AIS007_Table13_Template.xlsx",
);

const WORD_TEMPLATE_PATH = path.join(
  __dirname,
  "../templates/AIS007_Table13_Template.docx",
);

/* =========================================================
   XML HELPERS
========================================================= */

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/* =========================================================
   READ EXCEL
========================================================= */

function readExcelTemplate() {
  if (!fs.existsSync(EXCEL_PATH)) {
    throw new Error(`Excel template not found:\n${EXCEL_PATH}`);
  }

  const workbook = XLSX.readFile(EXCEL_PATH);

  const sheet = workbook.Sheets["Table 13 Template"];

  if (!sheet) {
    throw new Error('Sheet "Table 13 Template" not found.');
  }

  const rawRows = XLSX.utils.sheet_to_json(sheet, {
    defval: "",
  });

  const rows = rawRows
    .map((row, index) => ({
      type: String(row["Type"] || "field")
        .trim()
        .toLowerCase(),

      row:
        row["Row"] !== "" && row["Row"] !== undefined
          ? Number(row["Row"])
          : index,

      clauseNo: String(row["Clause No."] ?? "").trim(),

      label: String(row["Description / Label"] ?? "").trim(),

      fieldType: String(row["Field Type"] || "text")
        .trim()
        .toLowerCase(),

      required:
        String(row["Required"] || "")
          .trim()
          .toLowerCase() === "yes",

      options: String(row["Options"] ?? "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    }))
    .filter((item) => item.clauseNo || item.label || item.type === "heading");

  return rows;
}

/* =========================================================
   GET FORM
========================================================= */

export const getTable13Form = async (req, res) => {
  try {
    console.log("========== GET TABLE 13 FORM ==========");

    const rows = readExcelTemplate();

    return res.status(200).json({
      success: true,
      rows,
    });
  } catch (error) {
    console.error("Get Table 13 form error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to read Excel template.",
    });
  }
};

/* =========================================================
   GET WORD TABLE ROWS
========================================================= */

function getTableRows(documentXml) {
  const tableMatch = documentXml.match(/<w:tbl\b[\s\S]*?<\/w:tbl>/);

  if (!tableMatch) {
    throw new Error("Table 13 table was not found in the Word template.");
  }

  const tableXml = tableMatch[0];

  const rows = tableXml.match(/<w:tr\b[\s\S]*?<\/w:tr>/g) || [];

  return {
    tableXml,
    rows,
  };
}

/* =========================================================
   GET TABLE CELLS
========================================================= */

function getCells(rowXml) {
  return rowXml.match(/<w:tc\b[\s\S]*?<\/w:tc>/g) || [];
}

/* =========================================================
   REPLACE CELL TEXT
   KEEP EXISTING WORD FORMATTING
========================================================= */

function replaceCellText(cellXml, value) {
  const text = String(value ?? "");

  const pMatch = cellXml.match(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/);

  if (!pMatch) {
    return cellXml;
  }

  const paragraphXml = pMatch[0];

  const paragraphOpenMatch = paragraphXml.match(/^<w:p\b[^>]*>/);

  if (!paragraphOpenMatch) {
    return cellXml;
  }

  const paragraphOpen = paragraphOpenMatch[0];

  /*
    Keep the original paragraph
    properties exactly as they are.
  */

  const pPrMatch = paragraphXml.match(/<w:pPr\b[\s\S]*?<\/w:pPr>/);

  const pPr = pPrMatch ? pPrMatch[0] : "";

  /*
    Keep the original run formatting.
  */

  const rPrMatch = paragraphXml.match(/<w:rPr\b[\s\S]*?<\/w:rPr>/);

  const rPr = rPrMatch ? rPrMatch[0] : "";

  let runs = "";

  if (text !== "") {
    const parts = text.split(/\r?\n/);

    runs = parts
      .map((part, index) => {
        const line = escapeXml(part);

        const br = index < parts.length - 1 ? "<w:br/>" : "";

        return `
          <w:r>
            ${rPr}
            <w:t xml:space="preserve">${line}</w:t>
          </w:r>
          ${br}
        `;
      })
      .join("");
  }

  const newParagraph = `${paragraphOpen}${pPr}${runs}</w:p>`;

  return cellXml.replace(paragraphXml, newParagraph);
}

/* =========================================================
   REPLACE CELL IN ROW
========================================================= */

function replaceRowCell(rowXml, cellIndex, value) {
  const cells = getCells(rowXml);

  if (!cells[cellIndex]) {
    return rowXml;
  }

  const oldCell = cells[cellIndex];

  const newCell = replaceCellText(oldCell, value);

  return rowXml.replace(oldCell, newCell);
}

/* =========================================================
   REPLACE TEXT IN DOCUMENT ROW
========================================================= */

function replaceDocumentRow(rowXml, excelRow, value) {
  const cells = getCells(rowXml);

  /*
    Section rows in the original Word
    have 2 cells:

    Clause | Description + Response merged
  */

  if (excelRow.type === "heading") {
    let updated = rowXml;

    if (cells.length >= 1) {
      updated = replaceRowCell(updated, 0, excelRow.clauseNo);
    }

    if (cells.length >= 2) {
      updated = replaceRowCell(updated, 1, excelRow.label);
    }

    return updated;
  }

  /*
    Normal rows have:

    Clause | Description | Response
  */

  let updated = rowXml;

  if (cells.length >= 3) {
    updated = replaceRowCell(updated, 0, excelRow.clauseNo);

    updated = replaceRowCell(updated, 1, excelRow.label);

    updated = replaceRowCell(updated, 2, value);
  }

  return updated;
}

/* =========================================================
   FILL MAIN TABLE
========================================================= */

function fillMainTable(documentXml, excelRows, values) {
  const { tableXml, rows } = getTableRows(documentXml);

  /*
    Original Word structure:

    Row 0 = Technical Specifications title
    Row 1 = Clause No / Description / Response
    Row 2 onward = Excel rows

    Therefore:

    Excel row 0 -> Word row 2
    Excel row 1 -> Word row 3
    Excel row 2 -> Word row 4
    ...
  */

  const FIRST_DATA_ROW_INDEX = 2;

  if (rows.length < FIRST_DATA_ROW_INDEX + excelRows.length) {
    throw new Error(
      `Excel rows (${excelRows.length}) do not match Word template rows (${rows.length}).`,
    );
  }

  let updatedRows = [...rows];

  excelRows.forEach((excelRow, index) => {
    const wordRowIndex = FIRST_DATA_ROW_INDEX + index;

    const fieldKey = String(excelRow.row);

    const value = values?.[fieldKey] ?? values?.[excelRow.row] ?? "";

    updatedRows[wordRowIndex] = replaceDocumentRow(
      updatedRows[wordRowIndex],
      excelRow,
      value,
    );
  });

  let updatedTable = tableXml;

  rows.forEach((oldRow, index) => {
    const newRow = updatedRows[index];

    if (oldRow !== newRow) {
      updatedTable = updatedTable.replace(oldRow, newRow);
    }
  });

  return documentXml.replace(tableXml, updatedTable);
}

/* =========================================================
   FOOTER METADATA
========================================================= */

function addFooterValue(footerXml, label, value) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return footerXml;
  }

  const escaped = escapeXml(value);

  /*
    Find the first text node
    containing the label and append
    the entered value.

    Existing formatting remains untouched.
  */

  const regex = new RegExp(`(<w:t[^>]*>${label})([^<]*)(</w:t>)`);

  return footerXml.replace(regex, `$1 ${escaped}$3`);
}

function fillFooter(footerXml, metadata) {
  let updated = footerXml;

  updated = addFooterValue(updated, "Manufacturer", metadata?.manufacturer);

  updated = addFooterValue(updated, "Sheet No :", metadata?.sheetNo);

  updated = addFooterValue(updated, "Test Agency :", metadata?.testAgency);

  updated = addFooterValue(updated, "Document No", metadata?.documentNo);

  updated = addFooterValue(updated, "Name", metadata?.name);

  updated = addFooterValue(updated, "Designation :", metadata?.designation);

  updated = addFooterValue(updated, "Date :", metadata?.date);

  return updated;
}

/* =========================================================
   DOWNLOAD WORD
========================================================= */

export const downloadTable13Word = async (req, res) => {
  try {
    console.log("========== DOWNLOAD TABLE 13 WORD ==========");

    if (!fs.existsSync(WORD_TEMPLATE_PATH)) {
      throw new Error(`Word template not found:\n${WORD_TEMPLATE_PATH}`);
    }

    const values = req.body?.values || {};

    const metadata = req.body?.metadata || {};

    console.log("Received values:", values);

    console.log("Received metadata:", metadata);

    /*
        1. Read Excel
      */

    const excelRows = readExcelTemplate();

    /*
        2. Load ORIGINAL Word
      */

    const wordBuffer = fs.readFileSync(WORD_TEMPLATE_PATH);

    /*
        3. Open DOCX as ZIP
      */

    const zip = await JSZip.loadAsync(wordBuffer);

    /*
        4. Read document.xml
      */

    const documentFile = zip.file("word/document.xml");

    if (!documentFile) {
      throw new Error("word/document.xml not found.");
    }

    let documentXml = await documentFile.async("string");

    /*
        5. Fill existing Word table.

        IMPORTANT:
        We are NOT creating a new table.

        We are editing the original table.
      */

    documentXml = fillMainTable(documentXml, excelRows, values);

    /*
        6. Save modified document.xml
      */

    zip.file("word/document.xml", documentXml);

    /*
        7. Fill footer metadata
      */

    const footerFile = zip.file("word/footer1.xml");

    if (footerFile) {
      let footerXml = await footerFile.async("string");

      footerXml = fillFooter(footerXml, metadata);

      zip.file("word/footer1.xml", footerXml);
    }

    /*
        8. Generate DOCX

        Everything else in the original
        Word document remains untouched.
      */

    const outputBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    /*
        9. Download ONLY Word document
      */

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="AIS-007-Table-13-Filled.docx"',
    );

    res.setHeader("Content-Length", outputBuffer.length);

    return res.send(outputBuffer);
  } catch (error) {
    console.error("Download Table 13 Word error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate Word document.",
    });
  }
};