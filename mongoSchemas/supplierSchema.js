const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    nameOfSupplier: {
      type: String,
      required: true,
    },
    copCertificationNumber: {
      type: String
    },
    copCertificationValidityDate: {
      type: Date
    },
    testReportNumber: {
      type: String,
    },
    licenceNumber: {
      type: String,
    },
    licenceValidityDate: {
      type: Date,
    },
    applicationReferenceNumber: {
      type: String,
    },
    submissionDate: {
      type: Date,
    },
    supplierKey: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("supplier", supplierSchema);
