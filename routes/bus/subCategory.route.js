// import { Router } from "express";

// import { getSubCategories } from "../../controllers/bus/subCategoryController.js";

// const router = Router();

// router.get("/category/:categoryId", getSubCategories);

// export default router;

const express = require("express");
const router = express.Router();

const subCategoryController = require("../../controllers/bus/SubCategoryController");

router.get("/category/:categoryId", subCategoryController.getSubCategories);

module.exports = router;