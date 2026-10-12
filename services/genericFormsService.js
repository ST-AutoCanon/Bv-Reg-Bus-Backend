const form1AService = require("./form1AService");
const form7Service = require("./form7Service");
const form8Service = require("./form8Service");
const form11Service = require("./form11Service");
const form13Service = require("./form13Service");
const fileUploadService = require("./fileUploadService");

const loadash = require("lodash")


const calculateFormPercentage = async (formDataObj) => {
  delete formDataObj['homologationRequest'];
  delete formDataObj['createdAt'];
  delete formDataObj['updatedAt'];
  delete formDataObj['__v'];
  delete formDataObj['_id'];

  const totalComponents = Object.keys(formDataObj).length;
  if (totalComponents <= 0) {
    return 0;
  }

  let allComponentsPerceSummation = 0;

  for (const component of Object.keys(formDataObj)) {
    let percentFilled = 0;
    let totalProps = 0;
    let filledProps = 0;

    const componentData = formDataObj[component];
    delete componentData['label'];

    const componentDataKey = Object.keys(componentData)[0];
    const componentDataArr = componentData[componentDataKey];

    if (!Array.isArray(componentDataArr) || componentDataArr.length === 0) {
      percentFilled = 0;
    } else {
      for (const entry of componentDataArr) {
        if (entry.supplier && entry.supplier.active) {
          const clonedEntry = { ...entry };
          delete clonedEntry['supplier'];
          delete clonedEntry['_id'];

          for (const subSectionDataKey of Object.keys(clonedEntry)) {
            const subData = clonedEntry[subSectionDataKey];

            if (
              subData &&
              typeof subData === 'object' &&
              subData.properties &&
              typeof subData.properties === 'object'
            ) {
              const properties = subData.properties;
              const propKeys = Object.keys(properties);
              totalProps += propKeys.length;

              propKeys.forEach((prop) => {
                if (properties[prop].value !== '') {
                  filledProps++;
                }
              });
            }
          }
        }
      }

      percentFilled = totalProps > 0 ? (filledProps / totalProps) * 100 : 0;
      allComponentsPerceSummation += percentFilled;
    }
  }

  return (allComponentsPerceSummation / totalComponents).toFixed(2);
};

exports.getFormsData = async (requestId) => {
    // console.log(`fetching forms for requestId: ${requestId}`)
    let formsData = {}
    const form7ForRequest = await form7Service.getForm7ForRequestId(requestId)
    if (form7ForRequest != null) {
      formsData.form7Data = form7ForRequest
      const form7ForRequestcp = loadash.cloneDeep(form7ForRequest)
      const percentageFilled = await calculateFormPercentage(form7ForRequestcp)
      formsData.form7Data.percentageFilled = percentageFilled
    }
    const form8ForRequest = await form8Service.getForm8ForRequestId(requestId)
    if (form8ForRequest != null) {
      formsData.form8Data = form8ForRequest
      const form8ForRequestcp = loadash.cloneDeep(form8ForRequest)
      const percentageFilled = await calculateFormPercentage(form8ForRequestcp)
      formsData.form8Data.percentageFilled = percentageFilled
      // console.log('percentageFilled form8Data :',percentageFilled)
    }
    const form11ForRequest = await form11Service.getForm11ForRequestId(requestId)
    if (form11ForRequest != null) {
      formsData.form11Data = form11ForRequest
      const form11ForRequestcp = loadash.cloneDeep(form11ForRequest)
      const percentageFilled = await calculateFormPercentage(form11ForRequestcp)
      formsData.form11Data.percentageFilled = percentageFilled
    }
    const form13ForRequest = await form13Service.getForm13ForRequestId(requestId)
    if (form13ForRequest != null) {
      formsData.form13Data = form13ForRequest
      const form13ForRequestcp = loadash.cloneDeep(form13ForRequest)
      const percentageFilled = await calculateFormPercentage(form13ForRequestcp)
      formsData.form13Data.percentageFilled = percentageFilled
    }
    const form1AForRequest = await form1AService.getForm1AForRequestId(requestId)
    if(form1AForRequest != null) {
      formsData.form1AData = form1AForRequest
      const form1ADatacp = loadash.cloneDeep(form1AForRequest)
      const percentageFilled = await calculateFormPercentage(form1ADatacp)
      formsData.form1AData.percentageFilled = percentageFilled
    }
    return formsData
};

exports.getFileUploadData = async (requestId) => {
  // console.log(`fetching FileUploadData for requestId: ${requestId}`)
  return await fileUploadService.getFileUploadRequestId(requestId)
};


exports.createFormsComponentDataForSupplier = async (component, supplierId, requestId, forms) => {
  const formsData = {}
  for (const form of forms) {
    if (form === "7") {
      // console.log(`creating empty form for ${form}`)
      formsData.form7Data = await form7Service.createEmptyForm7ComponentDataForSupplier(component, supplierId, requestId)
    }
    if (form === "8") {
      // console.log(`creating empty form for ${form}`)
      formsData.form8Data = await form8Service.createEmptyForm8ComponentDataForSupplier(component, supplierId, requestId)
    }
    if (form === "11") {
      // console.log(`creating empty form for ${form}`)
      formsData.form11Data = await form11Service.createEmptyForm11ComponentDataForSupplier(component, supplierId, requestId)
    }
    if (form === "13") {
      // console.log(`creating empty form for ${form}`)
      formsData.form13Data = await form13Service.createEmptyForm13ComponentDataForSupplier(component, supplierId, requestId)
    }
    if (form === "1A") {
      //  console.log(`creating empty form for ${form}`)
       formsData.form1AData = await form1AService.createEmptyForm1AComponentDataForSupplier(component, supplierId, requestId)
    }
  }
  return formsData
}

exports.updateFormsData = async (requestId, data, formType) => {
  let updatedFormData
  if (formType === "7") {
    updatedFormData = await form7Service.updateForm7Data(requestId, data)
  }
  if (formType === "8") {
    updatedFormData = await form8Service.updateForm8Data(requestId, data)
  }
  if (formType === "11") {
    updatedFormData = await form11Service.updateForm11Data(requestId, data)
  }
  if (formType === "13") {
    updatedFormData = await form13Service.updateform13Data(requestId, data)
  }
  if (formType === "1A") {
    updatedFormData = await form1AService.updateform1AData(requestId, data)
  }
  // console.log(`returning updatedFormData: ${JSON.stringify(updatedFormData)}`)
  return updatedFormData
}

exports.createFormModelsForRequestId = async (requestId) => {
  try {
    // console.log(`creating empty forms for requestId: ${requestId}`)
    const formsData = {}
    const form7ForRequest = await form7Service.findOrCreateForm7(requestId)
    if (form7ForRequest != null) formsData.form7Data = form7ForRequest
    const form8ForRequest = await form8Service.findOrCreateForm8(requestId)
    if (form8ForRequest != null) formsData.form8Data = form8ForRequest
    const form11ForRequest = await form11Service.findOrCreateForm11(requestId)
    if (form11ForRequest != null) formsData.form11Data = form11ForRequest
    const form13ForRequest = await form13Service.findOrCreateForm13(requestId)
    if (form13ForRequest != null) formsData.form13Data = form13ForRequest
    const form1AForRequest = await form1AService.findOrCreateForm1A(requestId)
    if (form1AForRequest != null) formsData.form1AData = form1AForRequest
    return formsData
  } catch (error) {
    // console.log(`Exception occured: ${error}`)
    res.status(200).json({
      status: "failure",
      body: error,
    })
  }
}

exports.createFileUploadModelsForRequestId = async (requestId) => {
  try {
    // console.log(`creating empty file uploads for requestId: ${requestId}`)
    return await fileUploadService.findOrCreateFileUpload(requestId)
    
  } catch (error) {
    // console.log(`Exception occured: ${error}`)
    res.status(200).json({
      status: "failure",
      body: error,
    })
  }
}


function cleanClonedDoc(doc, newRequestId) {
  const cloned = JSON.parse(JSON.stringify(doc)); // deep copy
  delete cloned._id;
  delete cloned.createdAt;
  delete cloned.updatedAt;
  cloned.homologationRequest = newRequestId;
  return cloned;
}

exports.cloneFormsAndFilesForRequest = async (oldRequestId, newRequestId) => {
  const result = {};

  // FORM 1A
  const form1A = await form1AService.getForm1AForRequestId(oldRequestId);
  if (form1A) {
    const newForm = cleanClonedDoc(form1A, newRequestId);
    result.form1AData = await form1AService.insertNewForm1A(newForm);
  }

  // FORM 7
  const form7 = await form7Service.getForm7ForRequestId(oldRequestId);
  if (form7) {
    const newForm = cleanClonedDoc(form7, newRequestId);
    result.form7Data = await form7Service.insertNewForm7(newForm);
  }

  // FORM 8
  const form8 = await form8Service.getForm8ForRequestId(oldRequestId);
  if (form8) {
    const newForm = cleanClonedDoc(form8, newRequestId);
    result.form8Data = await form8Service.insertNewForm8(newForm);
  }

  // FORM 11
  const form11 = await form11Service.getForm11ForRequestId(oldRequestId);
  if (form11) {
    const newForm = cleanClonedDoc(form11, newRequestId);
    result.form11Data = await form11Service.insertNewForm11(newForm);
  }

  // FORM 13
  const form13 = await form13Service.getForm13ForRequestId(oldRequestId);
  if (form13) {
    const newForm = cleanClonedDoc(form13, newRequestId);
    result.form13Data = await form13Service.insertNewForm13(newForm);
  }

  // FILE UPLOAD
  const fileUploads = await fileUploadService.getFileUploadRequestId(oldRequestId);
  if (fileUploads) {
    const newUploads = cleanClonedDoc(fileUploads, newRequestId);
    result.fileUploadData = await fileUploadService.insertNewFileUpload(newUploads);
  }

  return result;
};