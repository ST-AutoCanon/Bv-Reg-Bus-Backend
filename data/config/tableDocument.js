import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const TABLE_DOCUMENTS = {
  table1A: {
    key: "table1A",
    label: "Table 1A",
    modelName: "Table1A",
    template: path.resolve(__dirname, "../templates/table1A.docx"),
    fileName: "Table1A.docx",
  },

  table3A: {
    key: "table3A",
    label: "Table 3A",
    modelName: "Table3A",
    template: path.resolve(__dirname, "../templates/table3A.docx"),
    fileName: "Table3A.docx",
  },

  table11: {
    key: "table11",
    label: "Table 11",
    modelName: "Table11",
    template: path.resolve(__dirname, "../templates/table11.docx"),
    fileName: "Table11.docx",
  },
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


