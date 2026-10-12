
const homologationRequestSchema = require("../mongoSchemas/homologationRequestSchema");
const componentsToFormsDataModel = require("../models/componentsToFormsDataModel.json");
const { getFormsData, createFormsComponentDataForSupplier, updateFormsData, getFileUploadData,cloneFormsAndFilesForRequest} = require("../services/genericFormsService")

exports.getFormsForRequest = async (req, res, next) => {
  try {
      const requestId = req.params.requestId;
      if (!requestId) {
        throw new Error(`Request doesnt contain requestId: "${requestId}"`);
      }
    const formsData = await getFormsData(requestId);
    const fileUploadData = await getFileUploadData(requestId);
    formsData.fileUploadData = fileUploadData;
        res.status(200).json({
          status: "success",
          body: formsData,
        });
  } catch (error) {
    // console.log(`Exception occured: ${error}`);
    res.status(200).json({
      status: "failure",
      body: error,
    });
  }
};

exports.createFormsForSupplier = async (req, res, next) => {
  try {
    const requestId = req.params.requestId
    const { supplierId, component } = req.body
    // console.log(`creating new supplier data for supplierId: "${supplierId}" , requestId: "${requestId}", component: "${component}"`)
    if (!supplierId || !requestId || !component) {
      throw new Error(
        `Request doesnt contain required parameters: supplierId: "${supplierId}" , requestId: "${requestId}", component: "${component}"`
      )
    }
    const requestData = await homologationRequestSchema.findById(requestId)
    if (!requestData || requestData === null) {
      throw new Error(`homologationRequest doesnt exist for requestId: "${requestId}"`)
    }
    const componentsToForms = componentsToFormsDataModel.filter((modelToForms) => {
      return modelToForms.component == component && modelToForms.vehicle_type == requestData.vehicle_type.value
    })
    // console.log(`componentsToForms: ${JSON.stringify(componentsToForms)}`)
    if (!componentsToForms || componentsToForms.length === 0) {
      throw new Error(`no forms found for component: "${component}"`)
    }
    let forms = []
    componentsToForms.forEach((componentsToForm) => {
      forms = forms.concat(componentsToForm.forms)
    })
    // console.log(`forms: ${JSON.stringify(forms)} for the component requested: ${component}`)
    const formsData = await createFormsComponentDataForSupplier(component, supplierId, requestId, forms)
    // console.log(`consolidated forms Data: ${formsData}`)
    res.status(200).json({
      status: "success",
      body: formsData,
    })
  } catch (error) {
    // console.log(`Exception occured: ${error}`);
    res.status(200).json({
      status: "failure",
      body: error,
    });
  }
}

exports.updateFormsData = async (req, res, next) => {
  try {
    const requestId = req.params.requestId
    const { data, formType } = req.body
    if (!requestId || !data || !formType) {
      throw new Error(`Request doesnt contain required parameters: requestId: "${requestId}" , data: "${data}", formType: "${formType}"`)
    }
    const formsData = await updateFormsData(requestId, data, formType)
    // console.log(`form: ${formType} updated. Data: ${JSON.stringify(formsData)}`)
    res.status(200)
    .json({ status: "success", body: formsData })
  } catch (error) {
    // console.log(`Exception occured: ${error}`)
    res.status(200)
    .json({status: "failure",body: error})
  }
}

exports.cloneFormsForNewRequest = async (req, res) => {
  try {
    const { sourceRequestId, targetRequestId } = req.body;

    if (!sourceRequestId || !targetRequestId) {
      return res.status(400).json({ status: "error", message: "Missing request IDs" });
    }

    const clonedResult = await cloneFormsAndFilesForRequest(sourceRequestId, targetRequestId);

    return res.status(200).json({
      status: "success",
      message: "Forms and files cloned successfully",
      data: clonedResult,
    });
  } catch (error) {
    console.error("Error cloning forms:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred during cloning",
      error: error.message,
    });
  }
};
