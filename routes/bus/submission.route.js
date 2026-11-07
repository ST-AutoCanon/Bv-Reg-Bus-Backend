// import { Router } from "express";

// import {
//   createSubmission,
//   getMySubmissions,
//   getSubmissionById,
//   updateSubmission,
// } from "../../controllers/bus/submissionController.js";

// import authMiddleware from "../../middleware/authMiddleware.js";

// const router = Router();

// const authenticateTokenMiddleWare = authMiddleware.authenticateTokenMiddleWare;

// // Create a new request
// router.post("/", authenticateTokenMiddleWare, createSubmission);

// // Get all requests belonging to logged-in user
// router.get("/", authenticateTokenMiddleWare, getMySubmissions);

// // Get one request belonging to logged-in user
// router.get("/:id", authenticateTokenMiddleWare, getSubmissionById);

// // Update an existing request
// router.patch("/:id", authenticateTokenMiddleWare, updateSubmission);

// export default router;



const express = require("express");

const router = express.Router();

const {
  authenticateTokenMiddleWare,
} = require("../../middleware/authMiddleware");

const submissionController = require("../../controllers/bus/submissionController");

router
  .route("/")
  .post(authenticateTokenMiddleWare, submissionController.createSubmission)
  .get(authenticateTokenMiddleWare, submissionController.getMySubmissions);

router
  .route("/:id")
  .get(authenticateTokenMiddleWare, submissionController.getSubmissionById)
  .patch(authenticateTokenMiddleWare, submissionController.updateSubmission);

module.exports = router;
