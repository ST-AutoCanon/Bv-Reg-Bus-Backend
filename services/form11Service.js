const form11Schema = require("../mongoSchemas/formsSchemas/form11Schema")
const {getSupplierByKey} = require('../controllers/supplierController')

const VehicleGeneralInformation = async (supplierId, form11) => {
  const VehicleGeneralInformation = {
    supplier: supplierId,
    Manufacturer_Details: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleGeneralInformation)} data for form11: ${form11._id}`)
  const updateform11Data = await form11Schema.findByIdAndUpdate(
    form11._id,
    { $push: { "Vehicle_General_Information.vehicleGeneralInformation": VehicleGeneralInformation } },
    { returnDocument: "after" }
  )
  //console.log(`updateform11Data: ${updateform11Data}`)
  return updateform11Data
}

const VehicleIdentificationNumber = async (supplierId, form11) => {
  const VehicleIdentificationNumber = {
    supplier: supplierId,
    VIN_Numbering: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleIdentificationNumber)} data for form11: ${form11._id}`)
  const updateform11Data = await form11Schema.findByIdAndUpdate(
    form11._id,
    { $push: { "Vehicle_Identification_Number.VehicleIdentificationNumber": VehicleIdentificationNumber } },
    { returnDocument: "after" }
  )
  //console.log(`updateform11Data: ${updateform11Data}`)
  return updateform11Data
}

const codeForMonthOfProduction = async (supplierId, form11) => {
  const codeForMonthOfProduction = {
    supplier: supplierId,
    Code_for_Year: {},
    Year_of_Production: {},    
   
    chassis_Number: {},
    vds_Sequence:{},
    Month_of_Production: {}
  }
  //console.log(`creating data: ${JSON.stringify(codeForMonthOfProduction)} data for form11: ${form11._id}`)
  const updateform11Data = await form11Schema.findByIdAndUpdate(
    form11._id,
    { $push: { "Month_of_Production.codeForMonthOfProduction": codeForMonthOfProduction } },
    { returnDocument: "after" }
  )
  //console.log(`updateform11Data: ${updateform11Data}`)
  return updateform11Data
}

exports.getForm11ForRequestId = async (requestId) => {
  try {
    const form11Data = await form11Schema.findOne({
      homologationRequest: requestId,
    }).lean()
    .populate({path: "Vehicle_General_Information.vehicleGeneralInformation.supplier"})
    .populate({path: "Vehicle_Identification_Number.VehicleIdentificationNumber.supplier"})
    .populate({path: "Month_of_Production.codeForMonthOfProduction.supplier"})
    if (form11Data != null) {
      return form11Data
    }
    return null
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    res.status(200).json({
      status: "failure",
      body: error,
    })
  }
}

exports.createEmptyForm11ComponentDataForSupplier = async (component, supplierId, requestId) => {
  try {
    //console.log(`fetching form11 data for requestId: ${requestId}`)
    const form11 = await findOrCreateForm11(requestId)
    switch (component) {
      case "Vehicle General Information":
        return await VehicleGeneralInformation(supplierId, form11)
      case "Vehicle Identification Number":
        return await VehicleIdentificationNumber(supplierId, form11)
        case "Code for Month of production":
          return await codeForMonthOfProduction(supplierId, form11)
      default:
        break
    }
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    return error
  }
}

exports.updateForm11Data = async (requestId, data) => {
  try {
    const form11 = await form11Schema.findOne({ homologationRequest: requestId })
    if (form11 == null) {
      throw new Error(`form11 doesnt exist with id: ${requestId}`)
    }
    let updatedform11Data
    //console.log(`updating ${JSON.stringify(data)} data for form11: ${form11._id}`)
    if (data.Manufacturer_Details) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            // "Vehicle_General_Information.vehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details": data.Manufacturer_Details,
            "Vehicle_General_Information.vehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details.properties.Basic_model.value": data.Manufacturer_Details.properties.Basic_model.value,
            "Vehicle_General_Information.vehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details.properties.variant.value": data.Manufacturer_Details.properties.variant.value,
          },
        },
        { arrayFilters: [{ "vehicleGeneralInformation._id": data._id }], returnDocument: "after" }
      )
    }
    

    if (data.VIN_Numbering) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            "Vehicle_Identification_Number.VehicleIdentificationNumber.$[vehicleIdentificationNumber].VIN_Numbering.properties.Position_of_the_code_for_month_in_the_Chassis_number.value":
              data.VIN_Numbering.properties.Position_of_the_code_for_month_in_the_Chassis_number.value,
            "Vehicle_Identification_Number.VehicleIdentificationNumber.$[vehicleIdentificationNumber].VIN_Numbering.properties.Position_of_the_code_for_year_in_the_Chassis_number.value":
              data.VIN_Numbering.properties.Position_of_the_code_for_year_in_the_Chassis_number.value,
            "Vehicle_Identification_Number.VehicleIdentificationNumber.$[vehicleIdentificationNumber].VIN_Numbering.properties.Example_of_Engine_Motor_No.value":
              data.VIN_Numbering.properties.Example_of_Engine_Motor_No.value,
          },
        },
        { 
          arrayFilters: [{ "vehicleIdentificationNumber._id": data._id }],
          returnDocument: "after" 
        }
      );
    }
    
    
    if (data.Year_of_Production) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            "Month_of_Production.codeForMonthOfProduction.$[codeForMonthOfProduction].Year_of_Production": data.Year_of_Production,
          },
        },
        { arrayFilters: [{ "codeForMonthOfProduction._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Code_for_Year) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            "Month_of_Production.codeForMonthOfProduction.$[codeForMonthOfProduction].Code_for_Year": data.Code_for_Year,
          },
        },
        { arrayFilters: [{ "codeForMonthOfProduction._id": data._id }], returnDocument: "after" }
      )
    }

   
   
  
    if (data.chassis_Number) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            "Month_of_Production.codeForMonthOfProduction.$[codeForMonthOfProduction].chassis_Number": data.chassis_Number,
          },
        },
        { arrayFilters: [{ "codeForMonthOfProduction._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.vds_Sequence) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            "Month_of_Production.codeForMonthOfProduction.$[codeForMonthOfProduction].vds_Sequence": data.vds_Sequence,
          },
        },
        { arrayFilters: [{ "codeForMonthOfProduction._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Month_of_Production) {
      updatedform11Data = await form11Schema.findByIdAndUpdate(
        form11._id,
        {
          $set: {
            "Month_of_Production.codeForMonthOfProduction.$[codeForMonthOfProduction].Month_of_Production": data.Month_of_Production,
          },
        },
        { arrayFilters: [{ "codeForMonthOfProduction._id": data._id }], returnDocument: "after" }
      )
    }
    return updatedform11Data
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    return error
  }
}

const findOrCreateForm11 = async (requestId) => {
  let form11 = await form11Schema.findOne({ homologationRequest: requestId })
    if (form11 == null) {
      //console.log(`creatng new form11 collection for supplierId: ${requestId}`)
      form11 = await form11Schema.create({
        homologationRequest: requestId,
      })
      const defaultSupplier = await getSupplierByKey();
      if(defaultSupplier){
        //console.log(`adding defaultSupplier for VehicleGeneralInformation of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleGeneralInformation(defaultSupplier._id, form11)
        //console.log(`adding defaultSupplier for VehicleIdentificationNumber of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleIdentificationNumber(defaultSupplier._id, form11)
        //console.log(`adding defaultSupplier for codeForMonthOfProduction of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await codeForMonthOfProduction(defaultSupplier._id, form11)
      } else{
        //console.log(`inside findOrCreateForm11 :defaultSupplier is not found`)
      }
    }
    return form11
}

exports.findOrCreateForm11 = findOrCreateForm11

exports.insertNewForm11 = async (form) => {
  // const Form11Model = require("../mongoSchemas/form11Schema");
  return await form11Schema.create(form);
};