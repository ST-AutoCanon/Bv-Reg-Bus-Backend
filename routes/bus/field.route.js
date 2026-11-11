// import { Router } from "express";

// import { getFields } from "../../controllers/bus/fieldController.js";

// const router = Router();

// router.get("/subcategory/:subCategoryId", getFields);

// export default router;

const express = require("express");
const router = express.Router();

const fieldController = require("../../controllers/bus/fieldController");

router.get("/subcategory/:subCategoryId", fieldController.getFields);

module.exports = router;