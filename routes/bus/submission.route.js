
const express = require("express");

const router = express.Router();

const {
  authenticateTokenMiddleWare,
} = require("../../middleware/authMiddleware");

const submissionController = require("../../controllers/bus/submissionController");
const uploadVehicleImage = require("../../middleware/uploadVehicleImage");

router
  .route("/")
  .post(
    authenticateTokenMiddleWare,
    uploadVehicleImage.single("vehicleImage"),
    submissionController.createSubmission
  )
  .get(
    authenticateTokenMiddleWare,
    submissionController.getMySubmissions
  );

router
  .route("/:id")
  .get(
    authenticateTokenMiddleWare,
    submissionController.getSubmissionById
  )
  .patch(
    authenticateTokenMiddleWare,
    submissionController.updateSubmission
  );

module.exports = router;
