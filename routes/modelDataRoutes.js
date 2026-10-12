const express = require("express");
const router = express.Router();

const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware");
const modelDataController = require("../controllers/modelDataController");

router
    .route("/homologationRequestComponents")
    .post(authenticateTokenMiddleWare, modelDataController.homologationRequestComponents);

module.exports = router;