const express = require("express");
const router = express.Router();
const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware");
const supplierController = require("../controllers/supplierController");

router
  .route("/")
  .post(authenticateTokenMiddleWare, supplierController.createSupplier)
  .patch(authenticateTokenMiddleWare, supplierController.switchSupplierStatus)

module.exports = router;
