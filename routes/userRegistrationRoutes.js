const express = require("express")
const userRegistrationController = require("../controllers/userRegistrationController")
const { adminAuthenticateTokenMiddleWare } = require("../middleware/adminAuthMiddleware")
const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware");
const uploadVehicleImage = require("../middleware/uploadVehicleImage");


const router = express.Router()

router
    .route("/newUserRegistration")
    .post(
        uploadVehicleImage.single("vehicleImage"),
        userRegistrationController.newUserRegistration
    );

router
    .route("/searchUserRegistrations")
    .post(adminAuthenticateTokenMiddleWare, userRegistrationController.searchUserRegistrations)

router
    .route("/processUserRegistration/:userRegistrationId/:status")
    .get(adminAuthenticateTokenMiddleWare, userRegistrationController.processUserRegistration)

router
  .route("/getRegisteredUserDetails")
  .get(
    authenticateTokenMiddleWare,
    userRegistrationController.getRegisteredUserDetails
  );


module.exports = router