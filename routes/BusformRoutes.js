const express = require("express");

const router = express.Router();

const {
  saveBusFormsData,
  getBusFormsData,
  updateSingleBusForm
} = require("../controllers/BusformController");


// Save complete Bus form data
router.post(
  "/:requestId",
  saveBusFormsData
);


// Get complete Bus form data
router.get(
  "/:requestId",
  getBusFormsData
);


// Update one specific form
router.put(
  "/:requestId/:formType",
  updateSingleBusForm
);

module.exports = router;