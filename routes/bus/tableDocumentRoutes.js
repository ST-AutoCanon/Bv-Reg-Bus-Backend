// import express from "express";

// import {
//   getTableDocumentStatuses,
//   downloadTableDocument,
//   downloadAllTableDocuments,
// } from "../../controllers/bus/tableDocumentController.js";

// import authMiddleware from "../../middleware/authMiddleware.js";

// const router = express.Router();

// const authenticateTokenMiddleWare = authMiddleware.authenticateTokenMiddleWare;

// // GET TABLE DOCUMENT STATUS
// router.get(
//   "/submissions/:id/table-documents",
//   authenticateTokenMiddleWare,
//   getTableDocumentStatuses,
// );

// // DOWNLOAD ONE TABLE
// router.get(
//   "/submissions/:id/table-documents/:tableName/download",
//   authenticateTokenMiddleWare,
//   downloadTableDocument,
// );

// // DOWNLOAD ALL TABLES
// router.get(
//   "/submissions/:id/table-documents/download-all",
//   authenticateTokenMiddleWare,
//   downloadAllTableDocuments,
// );

// export default router;



const express = require("express");
const router = express.Router();

const {
  authenticateTokenMiddleWare,
} = require("../../middleware/authMiddleware");

const {
  getTableDocumentStatuses,
  downloadTableDocument,
  downloadAllTableDocuments,
} = require("../../controllers/bus/tableDocumentController");

router.get(
  "/submissions/:id/table-documents",
  authenticateTokenMiddleWare,
  getTableDocumentStatuses
);

router.get(
  "/submissions/:id/table-documents/:tableName/download",
  authenticateTokenMiddleWare,
  downloadTableDocument
);

router.get(
  "/submissions/:id/table-documents/download-all",
  authenticateTokenMiddleWare,
  downloadAllTableDocuments
);

module.exports = router;