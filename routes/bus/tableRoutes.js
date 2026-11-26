const express = require("express");
const router = express.Router();


// Authentication Middleware
const {
  authenticateTokenMiddleWare,
} = require("../../middleware/authMiddleware");



// Table 3 Controller
const {
  getTable3,
} = require("../../controllers/bus/table/table3Controller");


// Table 2 Controller
const {
  getTable2,
} = require("../../controllers/bus/table/table2Controller");




// ===================================
// GET TABLE 3 BY SUBMISSION ID
// ===================================
router.get(
  "/table3/:submissionId",
  authenticateTokenMiddleWare,
  getTable3
);


// ===================================
// GET TABLE 2 BY SUBMISSION ID
// ===================================
router.get(
  "/table2/:submissionId",
  authenticateTokenMiddleWare,
  getTable2
);


// Export Router
module.exports = router;