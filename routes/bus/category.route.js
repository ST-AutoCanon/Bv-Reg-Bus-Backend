// import { Router } from "express";

// import { getCategories } from "../../controllers/bus/categoryController.js";

// const router = Router();

// router.get("/", getCategories);

// export default router;

const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/bus/CategoryController");

router.get("/", categoryController.getCategories);

module.exports = router;