import { Router } from "express";


import categoryRoute from "./category.route.js";

import subCategoryRoute from "./subCategory.route.js";

import fieldRoute from "./field.route.js";

import submissionRoute from "./submission.route.js";



import table13Route from "./table13.routes.js";

import tableDocumentRoute from "./tableDocumentRoutes.js";

const router = Router();



router.use("/categories", categoryRoute);

router.use("/subcategories", subCategoryRoute);

router.use("/fields", fieldRoute);

router.use("/submissions", submissionRoute);



router.use("/table13", table13Route);


/*
|--------------------------------------------------------------------------
| Table DOCX Documents
|--------------------------------------------------------------------------
*/

router.use(
  "/",
  tableDocumentRoute
);

export default router;
