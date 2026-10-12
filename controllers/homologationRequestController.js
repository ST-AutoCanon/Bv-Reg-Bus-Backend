const HomologationRequestSchema = require("../mongoSchemas/homologationRequestSchema");
const { createFormModelsForRequestId, createFileUploadModelsForRequestId,cloneFormsAndFilesForRequest } = require("../services/genericFormsService");


exports.getHomologationRequestTemplate = async (req, res, next) => {
  const paths = HomologationRequestSchema.schema.tree;
  if (!paths) {
        res.status(400)
  } else{
    res.status(200).json({
      paths,
    })
  }
}

exports.createHomologationRequest = async (req, res, next) => {
  try {
      const reqBody = req.body;
      const user = req.user;
      if(!user || user === null){
          throw new Error(`user not found, login again`);
      }
      // console.log(`user: ${JSON.stringify(user)}`);
      // console.log(`homologationRequest to create: ${JSON.stringify(reqBody)}`);
      const homologationRequestModel = {
        "vehicle_type.value": reqBody.vehicle_type,
        "fuel_type.value": reqBody.fuel_type,
        "certification_type.value": reqBody.certification_type,
        "vehicle_max_speed.value": reqBody.vehicle_max_speed,
        "motor_nominal_power.value": reqBody.motor_nominal_power,
        "motor_peak_power.value": reqBody.motor_peak_power,
        "vehicle_length.value": reqBody.vehicle_length,
        "vehicle_width.value": reqBody.vehicle_width,
        "vehicle_height.value": reqBody.vehicle_height,
        "vehicle_unloded_weight.value": reqBody.vehicle_unloded_weight,
        "vehicle_category.value": reqBody.vehicle_category,
        "prefered_testing_agency.value": reqBody.prefered_testing_agency,
        user: user._id,
      };
    // console.log(`creating homologationRequest: ${JSON.stringify(homologationRequestModel)}`)
    const homologationRequest = await HomologationRequestSchema.create(homologationRequestModel);
    const formsData = await createFormModelsForRequestId(homologationRequest._id)
    const fileUploadData = await createFileUploadModelsForRequestId(homologationRequest._id)
    formsData.fileUploadData = fileUploadData;
    res.status(200).json({
      status: "success",
      body: {homologationRequest, formsData},
    });
  } catch (error) {
    // console.error(`exception occured while creating homologationRequest: ${error}`);
    res.status(200).json({
      status: "failure",
      body: `exception occured while creating homologationRequest: ${error}`,
    });
  }
}

exports.getHomologationRequestsByUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || user === null) {
      throw new Error(`user not found, login again`);
    }
    // console.log(`getting HomologationRequests by user id: ${user._id}`);
    const homologationRequest = await HomologationRequestSchema.find({
      user: user._id,
    });
    res.status(200).json({
      status: "success",
      body: homologationRequest,
    });
  } catch (error) {
    // console.log(`exception occured while fetching homologationRequest data: ${error}`);
    res.status(200).json({
      status: "failure",
      body: error,
    });
  }
};

exports.searchHomologationRequests = async (req, res, next) => {
  try {
    const user = req.user
    if (!user || user === null) {
      throw new Error(`user not found, login again`)
    }
    if (user.role !== "admin") {
      throw new Error(`user is not admin, cant access this screen`)
    }
    const { registrationDate, vehicleType, testingAgency } = req.body
    if (registrationDate || vehicleType || testingAgency) {
      const query = {
        createdAt: "",
        "vehicle_type.value": vehicleType,
        "prefered_testing_agency.value": testingAgency,
      }
      if (!registrationDate) {
        delete query.createdAt
      } else {
        const startDate = new Date(Date.parse(registrationDate))
        const endDate = new Date(Date.parse(registrationDate)).setHours(23, 59, 59, 999)
        query.createdAt = { $gte: startDate, $lte: endDate }
      }
      if (!vehicleType) {
        delete query["vehicle_type.value"]
      }
      if (!testingAgency) {
        delete query["prefered_testing_agency.value"]
      }

      // console.log(`querying for homologationRequests with query: ${JSON.stringify(query)}`)
      const homologationRequest = await HomologationRequestSchema.find(query)

      res.status(200).json({
        status: "success",
        body: homologationRequest,
      })
    } else {
      throw new Error(
        `query doesnt containg required parameters:registrationDate: ${registrationDate}, 
        vehicleType: ${vehicleType}, testingAgency: ${testingAgency}`
      )
    }
  } catch (error) {
    // console.log(`exception occured while fetching homologationRequests for admin: ${error}`)
    res.status(200).json({
      status: "failure",
      body: error,
    })
  }
}


exports.cloneHomologationRequest = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error(`User not found. Please login again.`);
    }

    const originalRequestId = req.params.id;

    // ✅ 1. Check if original request exists
    const originalRequest = await HomologationRequestSchema.findById(originalRequestId);
    if (!originalRequest) {
      return res.status(404).json({ status: "failure", body: "Original request not found" });
    }

    // ✅ 2. Check if it has already been cloned
    const alreadyCloned = await HomologationRequestSchema.findOne({
      clonedFrom: originalRequestId
    });

    if (alreadyCloned) {
      return res.status(400).json({
        status: "failure",
        body: "This request has already been cloned once and cannot be cloned again."
      });
    }

    // ✅ 3. Prepare clone data
    const clonedRequestData = {
      vehicle_type: originalRequest.vehicle_type,
      fuel_type: originalRequest.fuel_type,
      certification_type: originalRequest.certification_type,
      vehicle_max_speed: originalRequest.vehicle_max_speed,
      motor_nominal_power: originalRequest.motor_nominal_power,
      motor_peak_power: originalRequest.motor_peak_power,
      vehicle_length: originalRequest.vehicle_length,
      vehicle_width: originalRequest.vehicle_width,
      vehicle_height: originalRequest.vehicle_height,
      vehicle_unloded_weight: originalRequest.vehicle_unloded_weight,
      vehicle_category: originalRequest.vehicle_category,
      prefered_testing_agency: originalRequest.prefered_testing_agency,
      user: originalRequest.user,
      request_number: originalRequest.request_number,
      clonedFrom: originalRequestId, // ✅ This marks the new one as a clone
      version: (originalRequest.version || 0) + 1 // ✅ Version logic added
    };
    // console.log('clonedRequestData:', clonedRequestData);
    // ✅ 4. Create new cloned request
    const [clonedRequest] = await HomologationRequestSchema.insertMany([clonedRequestData]);

    // ✅ 5. Set version and updatedAt
    await HomologationRequestSchema.updateOne(
      { _id: clonedRequest._id },
      { $set: { updatedAt: new Date() } } // version already set above
    );

    // ✅ 6. Clone forms and files
    const formsData = await cloneFormsAndFilesForRequest(originalRequest._id, clonedRequest._id);

    // ✅ 7. Create empty file upload models
    const fileUploadData = await createFileUploadModelsForRequestId(clonedRequest._id);
    formsData.fileUploadData = fileUploadData;

    // ✅ 8. Return success
    res.status(200).json({
      status: "success",
      body: {
        clonedRequest,
        formsData,
      },
    });
  } catch (error) {
    console.error(`Error cloning homologation request: ${error}`);
    res.status(500).json({
      status: "failure",
      body: error.message,
    });
  }
};