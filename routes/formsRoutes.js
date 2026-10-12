// routes/barrelRoutes.js

const express = require("express");
const router = express.Router();
const {  getBarrelsForUser,getBarrelByFinalOutput,submitBarrelData ,deleteBarrelByFinalOutput,deleteAllBarrels} = require("../controllers/barrelController"); // Import controller
const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware");

// GET route to fetch all barrel data
router.route("/all")
  .get(authenticateTokenMiddleWare, getBarrelsForUser); // GET to fetch all barrel data

  router.route("/:finalOutput")
  .get(authenticateTokenMiddleWare, getBarrelByFinalOutput);
  router.post("/", authenticateTokenMiddleWare,submitBarrelData);
  router.delete("/all", authenticateTokenMiddleWare, deleteAllBarrels);
  router.delete("/:finalOutput", authenticateTokenMiddleWare,deleteBarrelByFinalOutput);
 
module.exports = router;


