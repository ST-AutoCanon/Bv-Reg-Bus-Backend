const {
  saveBusFormsData,
  getBusFormsData,
  updateSingleFormData
} = require("../services/BusformService");

exports.saveBusFormsData = async (
  req,
  res,
  next
) => {
  try {
    const requestId = req.params.requestId;
    const { formData } = req.body;

    if (!requestId) {
      throw new Error(
        `Request doesnt contain requestId: "${requestId}"`
      );
    }

    if (!formData) {
      throw new Error(
        "Request doesnt contain formData"
      );
    }

    const savedData =
      saveBusFormsData(
        requestId,
        formData
      );

    return res.status(200).json({
      status: "success",
      body: savedData
    });
  } catch (error) {
    console.error(
      "Error saving Bus forms:",
      error
    );

    return res.status(200).json({
      status: "failure",
      body: error.message
    });
  }
};

exports.getBusFormsData = async (
  req,
  res,
  next
) => {
  try {
    const requestId =
      req.params.requestId;

    if (!requestId) {
      throw new Error(
        `Request doesnt contain requestId: "${requestId}"`
      );
    }

    const formsData =
      getBusFormsData(requestId);

    if (!formsData) {
      return res.status(404).json({
        status: "failure",
        body: "Bus forms data not found"
      });
    }

    return res.status(200).json({
      status: "success",
      body: formsData
    });
  } catch (error) {
    console.error(
      "Error getting Bus forms:",
      error
    );

    return res.status(200).json({
      status: "failure",
      body: error.message
    });
  }
};

exports.updateSingleBusForm = async (
  req,
  res,
  next
) => {
  try {
    const requestId =
      req.params.requestId;

    const formType =
      req.params.formType;

    const { data } = req.body;

    if (!requestId) {
      throw new Error(
        "requestId is required"
      );
    }

    if (!formType) {
      throw new Error(
        "formType is required"
      );
    }

    if (!data) {
      throw new Error(
        "data is required"
      );
    }

    const updatedData =
      updateSingleFormData(
        requestId,
        formType,
        data
      );

    return res.status(200).json({
      status: "success",
      body: updatedData
    });
  } catch (error) {
    console.error(
      "Error updating Bus form:",
      error
    );

    return res.status(200).json({
      status: "failure",
      body: error.message
    });
  }
};