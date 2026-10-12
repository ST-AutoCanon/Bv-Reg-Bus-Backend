const express = require("express")
const userRegistrationController = require("../controllers/userRegistrationController")
const { adminAuthenticateTokenMiddleWare } = require("../middleware/adminAuthMiddleware")

const router = express.Router()

router
    .route("/newUserRegistration")
    .post(userRegistrationController.newUserRegistration)

router
    .route("/searchUserRegistrations")
    .post(adminAuthenticateTokenMiddleWare, userRegistrationController.searchUserRegistrations)

router
    .route("/processUserRegistration/:userRegistrationId/:status")
    .get(adminAuthenticateTokenMiddleWare, userRegistrationController.processUserRegistration)

module.exports = router