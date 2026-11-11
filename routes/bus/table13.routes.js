// import express from "express";

// import {
//   getTable13Form,
//   downloadTable13Word,
// } from "../../controllers/bus/table13.controller.js";

// import authMiddleware from "../../middleware/authMiddleware.js";

// const router = express.Router();

// const authenticateTokenMiddleWare = authMiddleware.authenticateTokenMiddleWare;

// // GET: Read Excel and return form definition
// router.get("/form", authenticateTokenMiddleWare, getTable13Form);

// // POST: Generate Word using Excel + user values
// router.post("/download", authenticateTokenMiddleWare, downloadTable13Word);

// export default router;

const express = require("express");

const router = express.Router();

const {
  authenticateTokenMiddleWare,
} = require("../../middleware/authMiddleware");

const table13Controller = require("../../controllers/bus/table13.controller");

router
  .route("/form")
  .get(authenticateTokenMiddleWare, table13Controller.getTable13Form);

router
  .route("/download")
  .post(authenticateTokenMiddleWare, table13Controller.downloadTable13Word);

module.exports = router;