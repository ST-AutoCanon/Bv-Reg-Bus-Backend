const supplierSchema = require("../mongoSchemas/supplierSchema");
const defaultSupplierKey = "vehical_ok_default_supplier";

function getSupplierModel(reqBody) {
  return {
    active: reqBody.active,
    nameOfSupplier: reqBody.nameOfSupplier,
    copCertificationNumber: reqBody.copCertificationNumber,
    copCertificationValidityDate: reqBody.copCertificationValidityDate,
    testReportNumber: reqBody.testReportNumber,
    licenceNumber: reqBody.licenceNumber,
    licenceValidityDate: reqBody.licenceValidityDate,
    applicationReferenceNumber: reqBody.applicationReferenceNumber,
    submissionDate: reqBody.submissionDate,
  };
}

async function createMongoSupplier(supplierModel) {
  return await supplierSchema.create(supplierModel);
}

exports.createSupplier = async (req, res, next) => {
  try {
      const reqBody = req.body
      if(!reqBody) {
        throw new Error(`reqBody is not provided`)
      }
      const supplierModel = getSupplierModel(reqBody)
    // console.log(`creating supplier: ${JSON.stringify(supplierModel)}`)
    const supplier = await createMongoSupplier(supplierModel);
    res.status(200).json({
      status: "success",
      body: supplier,
    });
  } catch (error) {
    // console.log(`exception occured: ${error}`);
    res.status(200).json({
      status: "failure",
      body: error,
    });
  }
};

exports.switchSupplierStatus = async (req, res, next) => {
  try {
    const reqBody = req.body
    const supplierId = reqBody.supplierId
    const status = reqBody.status
    if(!supplierId || status === undefined){
      throw new Error(`required parameters not provided supplierId: ${supplierId}, status: ${status}`)
    }
    // console.log(`updating the supplierId : ${supplierId} to status: ${status}`)
    const supplierSwitchStatus = await supplierSchema.findByIdAndUpdate(supplierId, { active: status }, { returnDocument: "after" })
    if(supplierSwitchStatus){
          res.status(200).json({
            status: "success",
            body: supplierSwitchStatus,
          })
    }
  } catch (error) {
    // console.log(`exception occured: ${error}`)
    res.status(200).json({
      status: "failure",
      body: error,
    })
  }
}

exports.getSupplierByKey = async () => {
  try {
    if(!defaultSupplierKey){
      throw new Error(`required parameters not provided to fetch supplier. key: ${defaultSupplierKey},`)
    }
    // console.log(`fetching supplier with key: ${defaultSupplierKey}`)
    return await supplierSchema.findOne({ supplierKey: defaultSupplierKey })
  } catch (error) {
    // console.log(`exception occured: ${error}`)
  }
}

exports.createMongoSupplier = createMongoSupplier