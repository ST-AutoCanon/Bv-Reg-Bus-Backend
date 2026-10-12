const express = require("express")
const userAuthController = require("../controllers/userAuthController")
const { adminSignupAuthTokenMiddleware } = require("../middleware/adminAuthMiddleware")
const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware")
const router = express.Router()

router
    .route("/signup")
    .post(adminSignupAuthTokenMiddleware, userAuthController.signUp)

router
    .route("/signin")
    .post(userAuthController.signin)

router
    .route("/resetPassword")
    .post(authenticateTokenMiddleWare, userAuthController.resetPassword)

router
    .route("/forgotPassword")
    .post(userAuthController.forgotPassword)

module.exports = router
