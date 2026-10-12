const express = require("express");
const router = express.Router();
const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware");
const { adminAuthenticateTokenMiddleWare } = require("../middleware/adminAuthMiddleware")
const homologationRequestController = require("../controllers/homologationRequestController");


router
  .route("/")
  .get(authenticateTokenMiddleWare, homologationRequestController.getHomologationRequestsByUser)
  .post(authenticateTokenMiddleWare, homologationRequestController.createHomologationRequest);

    // Clone route
router
.route("/cloneHomologationRequest/:id")
.post(authenticateTokenMiddleWare, homologationRequestController.cloneHomologationRequest);

router
  .route("/searchHomologationRequests")
  .post(adminAuthenticateTokenMiddleWare, homologationRequestController.searchHomologationRequests)

router
  .route("/template")
  .get(authenticateTokenMiddleWare, homologationRequestController.getHomologationRequestTemplate);



module.exports = router;
