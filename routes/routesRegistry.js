const multer = require("multer");

const userAuthRoutes = require("./userAuthRoutes");
const userRegistrationRoutes = require("./userRegistrationRoutes");
const homologationRequest = require("./homologationRequestRoutes");
const supplierRoutes = require("./supplierRoutes");
const modelDataRoutes = require("./modelDataRoutes");
const formsDataRoutes = require("./formsDataRoutes");
const { authenticateTokenMiddleWare } = require("../middleware/authMiddleware");
const fileUploadController = require("../controllers/fileUploadController");
const barrelRoutes = require("./formsRoutes");





const busRoutes = require("./bus/index.js").default;
const busFormsRoutes = require("./BusformRoutes");






// NEW: Combined table routes
const tableRoutes = require("./bus/tableRoutes");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/home/ubuntu/Bv-reg(new)/neww/auto-canon-FE-master/src/footerUploads/",
    );
  },

  filename: function (req, file, cb) {
    const requestId = req.params.requestId.replace(/\//g, "");
    const originalname = file.originalname.replace(/\s+/g, "_");
    const filename = `${requestId}-${originalname}`;

    cb(null, filename);
  },
});

exports.registerRoutes = async (app) => {
  app.use("/api/user", userAuthRoutes);
  app.use("/api/userRegistration", userRegistrationRoutes);
  app.use("/api/homologationRequest", homologationRequest);
  app.use("/api/supplier", supplierRoutes);
  app.use("/api/getModelData", modelDataRoutes);
  app.use("/api/forms", formsDataRoutes);
  app.use("/api/files", formsDataRoutes);
  app.use("/api/barrels", barrelRoutes);

  app.use("/api/bus-forms", busFormsRoutes);

  // Existing bus routes
  app.use("/api/bus", busRoutes);

  // NEW: All table routes
  app.use("/api/bus", tableRoutes);

  const upload = multer({
    storage: storage,
  });

  app.post(
    "/api/files/upload/:requestId/",
    authenticateTokenMiddleWare,
    upload.single("image"),
    async (req, res) => {
      if (!req.file) {
        return res.status(400).send("No image uploaded.");
      }

      const fileUpload = await fileUploadController.fileUpload(req);

      return res.status(200).json({
        status: "success",
        body: fileUpload,
      });
    },
  );
};
