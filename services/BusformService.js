const fs = require("fs");
const path = require("path");
const busFormsDataModel = require("../models/BusformDatamodal.json");

const dataFilePath = path.join(
  __dirname,
  "../data/busFormsData.json"
);

const readBusFormsData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return {};
  }

  const fileData = fs.readFileSync(
    dataFilePath,
    "utf-8"
  );

  if (!fileData.trim()) {
    return {};
  }

  return JSON.parse(fileData);
};

const writeBusFormsData = (data) => {
  fs.writeFileSync(
    dataFilePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
};

const validateFormData = (formData) => {
  if (!formData || typeof formData !== "object") {
    throw new Error("formData is required");
  }

  const invalidForms = Object.keys(formData).filter(
    (formType) =>
      !busFormsDataModel.formTypes.includes(formType)
  );

  if (invalidForms.length > 0) {
    throw new Error(
      `Invalid form type(s): ${invalidForms.join(", ")}`
    );
  }

  return true;
};

const saveBusFormsData = (
  requestId,
  formData
) => {
  validateFormData(formData);

  const existingData = readBusFormsData();

  const currentData = existingData[requestId] || {
    requestId,
    formData: {}
  };

  currentData.formData = {
    ...currentData.formData,
    ...formData
  };

  currentData.updatedAt =
    new Date().toISOString();

  existingData[requestId] = currentData;

  writeBusFormsData(existingData);

  return currentData;
};

const getBusFormsData = (requestId) => {
  const existingData = readBusFormsData();

  return existingData[requestId] || null;
};

const updateSingleFormData = (
  requestId,
  formType,
  data
) => {
  if (
    !busFormsDataModel.formTypes.includes(
      formType
    )
  ) {
    throw new Error(
      `Invalid form type: ${formType}`
    );
  }

  const existingData = readBusFormsData();

  if (!existingData[requestId]) {
    existingData[requestId] = {
      requestId,
      formData: {}
    };
  }

  existingData[requestId].formData[
    formType
  ] = data;

  existingData[requestId].updatedAt =
    new Date().toISOString();

  writeBusFormsData(existingData);

  return existingData[requestId];
};

module.exports = {
  saveBusFormsData,
  getBusFormsData,
  updateSingleFormData
};