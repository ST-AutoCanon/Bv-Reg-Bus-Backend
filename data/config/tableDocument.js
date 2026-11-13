// import path from "node:path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export const TABLE_DOCUMENTS = {
//   table1A: {
//     key: "table1A",
//     label: "Table 1A",
//     modelName: "Table1A",
//     template: path.resolve(__dirname, "../templates/table1A.docx"),
//     fileName: "Table1A.docx",
//   },

//   table3A: {
//     key: "table3A",
//     label: "Table 3A",
//     modelName: "Table3A",
//     template: path.resolve(__dirname, "../templates/table3A.docx"),
//     fileName: "Table3A.docx",
//   },

//   table11: {
//     key: "table11",
//     label: "Table 11",
//     modelName: "Table11",
//     template: path.resolve(__dirname, "../templates/table11.docx"),
//     fileName: "Table11.docx",
//   },
// };

// export const getTableDocument = (tableName) => {
//   const table = TABLE_DOCUMENTS[tableName];

//   if (!table) {
//     const error = new Error(`Unsupported table document: ${tableName}`);

//     error.statusCode = 400;

//     throw error;
//   }

//   return table;
// };

// export const getAllTableDocuments = () => {
//   return Object.values(TABLE_DOCUMENTS);
// };

// export const isSupportedTableDocument = (tableName) => {
//   return Boolean(TABLE_DOCUMENTS[tableName]);
// };



import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTableDocument = (key, label, fileName) => ({
  key,
  label,
  modelName: key === "table1A" ? "Table1A" : key,
  template: path.resolve(__dirname, `../templates/${fileName}`),
  fileName,
});

export const TABLE_DOCUMENTS = {
  table1A: createTableDocument("table1A", "Table 1A", "table1A.docx"),

  T2: createTableDocument("T2", "Table 2", "T2.docx"),
  T3: createTableDocument("T3", "Table 3", "T3.docx"),
  T5: createTableDocument("T5", "Table 5", "T5.docx"),
  T6: createTableDocument("T6", "Table 6", "T6.docx"),
  T7C: createTableDocument("T7C", "Table 7C", "T7C.docx"),
  T8: createTableDocument("T8", "Table 8", "T8.docx"),
  T11: createTableDocument("T11", "Table 11", "T11.docx"),
  T13: createTableDocument("T13", "Table 13", "T13.docx"),
  T22: createTableDocument("T22", "Table 22", "T22.docx"),
  T22P1: createTableDocument("T22P1", "Table 22 P1", "T22P1.docx"),
  T22P2: createTableDocument("T22P2", "Table 22 P2", "T22P2.docx"),
  T22B: createTableDocument("T22B", "Table 22B", "T22B.docx"),
  T22C: createTableDocument("T22C", "Table 22C", "T22C.docx"),
  T22D: createTableDocument("T22D", "Table 22D", "T22D.docx"),
};

export const getTableDocument = (tableName) => {
  const table = TABLE_DOCUMENTS[tableName];

  if (!table) {
    const error = new Error(`Unsupported table document: ${tableName}`);
    error.statusCode = 400;
    throw error;
  }

  return table;
};

export const getAllTableDocuments = () => {
  return Object.values(TABLE_DOCUMENTS);
};

export const isSupportedTableDocument = (tableName) => {
  return Boolean(TABLE_DOCUMENTS[tableName]);
};
