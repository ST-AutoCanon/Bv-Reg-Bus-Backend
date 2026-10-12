const form13Schema = require("../mongoSchemas/formsSchemas/form13Schema")
const form8Schema = require("../mongoSchemas/formsSchemas/form8Schema")
const form7Schema = require("../mongoSchemas/formsSchemas/form7Schema")
const {getSupplierByKey} = require('../controllers/supplierController')


const VehicleGeneralInformation = async (supplierId, form13) => {
  const VehicleGeneralInformation = {
    supplier: supplierId,
    Manufacturer_Details: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleGeneralInformation)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Vehicle_General_Information.vehicleGeneralInformation": VehicleGeneralInformation } },
    { returnDocument: "after" }
  )
   //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const Generalarrangementofthevehicle = async (supplierId, form13) => {
  const Generalarrangementofthevehicle = {
    supplier: supplierId,
    General_description_of_vehicle: {},
  }
   //console.log(`creating data: ${JSON.stringify(Generalarrangementofthevehicle)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "General_arrangement_of_the_vehicle.generalArrangementOfTheVehicle": Generalarrangementofthevehicle } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const DriveTrain = async (supplierId, form13) => {
  const DriveTrain = {
    supplier: supplierId,
    Drive_Train: {},
  }
  //console.log(`creating data: ${JSON.stringify(DriveTrain)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Drive_Train.driveTrain": DriveTrain } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const Tractionmotor = async (supplierId, form13) => {
  const Tractionmotor = {
    supplier: supplierId,
    Traction_Motor: {},
  }
  //console.log(`creating data: ${JSON.stringify(Tractionmotor)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Traction_motor.tractionMotor": Tractionmotor } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const CoolingSystem = async (supplierId, form13) => {
  const CoolingSystem = {
    supplier: supplierId,
    Cooling_System: {},
  }
  //console.log(`creating data: ${JSON.stringify(CoolingSystem)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Cooling_System.coolingSystem": CoolingSystem } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const TractionBatterypack = async (supplierId, form13) => {
  const TractionBatterypack = {
    supplier: supplierId,
    Traction_Battery_Pack: {},
  }
  //console.log(`creating data: ${JSON.stringify(TractionBatterypack)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Traction_Battery_Pack.TractionBatterypack": TractionBatterypack } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const DriveTrainSystem = async (supplierId, form13) => {
  const DriveTrainSystem = {
    supplier: supplierId,
    Drive_Train: {},
    Traction_Motor:{},
  }
  //console.log(`creating data: ${JSON.stringify(DriveTrainSystem)} data for form1A: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Drive_Train_System.DriveTrainSystemData": DriveTrainSystem } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const BatteryMangementSystem = async (supplierId, form13) => {
  const BatteryMangementSystem = {
    supplier: supplierId,
    Battery_Mangement_System: {},
  }
  //console.log(`creating data: ${JSON.stringify(BatteryMangementSystem)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Battery_Mangement_System.BatteryMangementSystem": BatteryMangementSystem } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const Lubrication = async (supplierId, form13) => {
  const Lubrication = {
    supplier: supplierId,
    Lubrication: {},
  }
  //console.log(`creating data: ${JSON.stringify(Lubrication)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Lubrication.LubricationData": Lubrication } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const InstrumentCluster = async (supplierId, form13) => {
  const InstrumentCluster = {
    supplier: supplierId,
    Battery_Mangement_System: {},
  }
  //console.log(`creating data: ${JSON.stringify(InstrumentCluster)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Instrument_Cluster.InstrumentCluster": InstrumentCluster } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const DCDCConverter = async (supplierId, form13) => {
  const DCDCConverter = {
    supplier: supplierId,
    DC_DC_Converter: {},
  }
  //console.log(`creating data: ${JSON.stringify(DCDCConverter)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "DC_DC_Converter.DCDCConverter": DCDCConverter } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const InsulatingCategory = async (supplierId, form13) => {
  const InsulatingCategory = {
    supplier: supplierId,
    Insulating_Category: {},
  }
  //console.log(`creating data: ${JSON.stringify(InsulatingCategory)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Insulating_Category.InsulatingCategory": InsulatingCategory } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const VehicleControlUnit = async (supplierId, form13) => {
  const VehicleControlUnit = {
    supplier: supplierId,
    Vehicle_Control: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleControlUnit)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Vehicle_Control_Unit.VehicleControlUnit": VehicleControlUnit } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const ChargerSpecification = async (supplierId, form13) => {
  const ChargerSpecification = {
    supplier: supplierId,
    Charger: {},
    Specifications: {},
    on_board_charger: {},
    Electrical_details_of_vehicle: {},
    Portable_Residual_Current_Device_PRCD:{},
  }
  //console.log(`creating data: ${JSON.stringify(ChargerSpecification)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Charger_Specification.ChargerSpecification": ChargerSpecification } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const ElectricalSafetyDevice = async (supplierId, form13) => {
  const ElectricalSafetyDevice = {
    supplier: supplierId,
    // Specifications_of_circuit_breakers: {},
    Specifications_of_circuit_breakers_or_fuses_used_for_protection_of_batteries_or_power_train: {},
  }
  //console.log(`creating data: ${JSON.stringify(ElectricalSafetyDevice)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Electrical_Safety_Device.ElectricalSafetyDevice": ElectricalSafetyDevice } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const VehicleElectricalSpecification = async (supplierId, form13) => {
  const VehicleElectricalSpecification = {
    supplier: supplierId,
    Electrical_system: {},
    Electric_harness: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleElectricalSpecification)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Vehicle_Electrical_Specification.VehicleElectricalSpecification": VehicleElectricalSpecification } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

const Controller = async (supplierId, form13) => {
  const PowerController = {
    supplier: supplierId,
    Power_Controller: {},
  }
  //console.log(`creating data: ${JSON.stringify(PowerController)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    { $push: { "Controller.PowerController": PowerController } },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}
const VehiclePerformanceData = async (supplierId, form13) => {
  const VehiclePerformanceData = {
    supplier: supplierId,
    Performance: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehiclePerformanceData)} data for form13: ${form13._id}`)
  const updateform13Data = await form13Schema.findByIdAndUpdate(
    form13._id,
    {
      $push: {
        "Vehicle_Performance.VehiclePerformance": VehiclePerformanceData,
      },
    },
    { returnDocument: "after" }
  )
  //console.log(`updateform13Data: ${updateform13Data}`)
  return updateform13Data
}

exports.getForm13ForRequestId = async (requestId) => {
  try {
    const form13Data = await form13Schema.findOne({
      homologationRequest: requestId,
    }).lean()
    .populate({path: "Vehicle_General_Information.vehicleGeneralInformation.supplier"})
    .populate({path:"General_arrangement_of_the_vehicle.generalArrangementOfTheVehicle.supplier"} )
    .populate({path:"Cooling_System.coolingSystem.supplier"})
    .populate({path:"Traction_Battery_Pack.TractionBatterypack.supplier"} )
    .populate({path:"Battery_Mangement_System.BatteryMangementSystem.supplier"} )
    .populate({path:"Drive_Train_System.DriveTrainSystemData.supplier"})
    .populate({path:"Lubrication.LubricationData.supplier"})
    .populate({path:"Instrument_Cluster.InstrumentCluster.supplier"})
    .populate({path:"DC_DC_Converter.DCDCConverter.supplier"} )
    .populate({path:"Insulating_Category.InsulatingCategory.supplier"})
    .populate({path:"Charger_Specification.ChargerSpecification.supplier"})
    .populate({path:"Electrical_Safety_Device.ElectricalSafetyDevice.supplier"} )
    .populate({path:"Vehicle_Electrical_Specification.VehicleElectricalSpecification.supplier"} )
    .populate({path:"Controller.PowerController.supplier"})    
    .populate({path: "Vehicle_Performance.VehiclePerformance.supplier"})
    .populate({path:"Vehicle_Control_Unit.VehicleControlUnit.supplier"}) 
    if (form13Data != null) {
      return form13Data
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

exports.createEmptyForm13ComponentDataForSupplier = async (component, supplierId, requestId) => {
  try {
    //console.log(`fetching form13 data for requestId: ${requestId}`)
    const form13 = await findOrCreateForm13(requestId)
    switch (component) {
      case "Vehicle General Information":
        return await VehicleGeneralInformation(supplierId, form13)
      case "General arrangement of the vehicle":
        return await Generalarrangementofthevehicle(supplierId, form13)
      case "Drive Train":
        return await DriveTrain(supplierId, form13)
      case "Traction motor":
        return await Tractionmotor(supplierId, form13)
      case "Cooling System":
        return await CoolingSystem(supplierId, form13)
      case "Traction Battery Pack":
        return await TractionBatterypack(supplierId, form13)
      case "Drive Train system":
        return await DriveTrainSystem(supplierId, form13)
      case "Battery Mangement System":
        return await BatteryMangementSystem(supplierId, form13)
      case "Lubrication":
        return await Lubrication(supplierId, form13)
      case "Instrument Cluster":
        return await InstrumentCluster(supplierId, form13)
      case "DC-DC Converter":
        return await DCDCConverter(supplierId, form13)
      case "Insulating Category":
        return await InsulatingCategory(supplierId, form13)
      case "Charger Specification":
        return await ChargerSpecification(supplierId, form13)
      case "Electrical Safety Device":
        return await ElectricalSafetyDevice(supplierId, form13)
      case "Vehicle Electrical Specification":
        return await VehicleElectricalSpecification(supplierId, form13)
      case "Controller":
        return await Controller(supplierId, form13)
        case "Vehicle Performance":
          return await VehiclePerformanceData(supplierId, form13)
      default:
        break
    }
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    return error
  }
}

exports.updateform13Data = async (requestId, data) => {
  try {
    const form13 = await form13Schema.findOne({ homologationRequest: requestId })
    const form8 = await form8Schema.findOne({ homologationRequest: requestId })
    const form7 = await form7Schema.findOne({ homologationRequest: requestId })

    if (form13 == null) {
      throw new Error(`form13 doesnt exist with id: ${requestId}`)
    }
    let updatedform13Data
    
    if (data.Manufacturer_Details) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Vehicle_General_Information.vehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details.properties.Basic_model.value":
              data.Manufacturer_Details.properties.Basic_model.value,
          },
        },
        {
          arrayFilters: [{ "vehicleGeneralInformation._id": data._id }],
          returnDocument: "after", // or new: true if using Mongoose
        }
      );
    }
     
    if (data.General_description_of_vehicle) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "General_arrangement_of_the_vehicle.generalArrangementOfTheVehicle.$[generalArrangementOfTheVehicle].General_description_of_vehicle":
              data.General_description_of_vehicle,
          },
        },
        { arrayFilters: [{ "generalArrangementOfTheVehicle._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Drive_Train) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Drive_Train.driveTrain.$[driveTrain].Drive_Train": data.Drive_Train,
          },
        },
        { arrayFilters: [{ "driveTrain._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Cooling_System) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Cooling_System.coolingSystem.$[coolingSystem].Cooling_System": data.Cooling_System,
          },
        },
        { arrayFilters: [{ "coolingSystem._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Traction_Battery_Pack) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Traction_Battery_Pack.TractionBatterypack.$[tractionBatterypack].Traction_Battery_Pack": data.Traction_Battery_Pack,
          },
        },
        { arrayFilters: [{ "tractionBatterypack._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
        if (form8) {
        const item = form8.Traction_Battery_Pack.TractionBatterypack.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Traction_Battery_Pack.TractionBatterypack.$[item].Traction_Battery_Pack.properties.Make.value": data.Traction_Battery_Pack.properties.Make.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Battery_Mangement_System) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Battery_Mangement_System.BatteryMangementSystem.$[batteryMangementSystem].Battery_Mangement_System": data.Battery_Mangement_System,
          },
        },
        { arrayFilters: [{ "batteryMangementSystem._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Lubrication) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Lubrication.LubricationData.$[lubrication].Lubrication": data.Lubrication,
          },
        },
        { arrayFilters: [{ "lubrication._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Drive_Train) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Drive_Train": data.Drive_Train,
          },
        },
        { arrayFilters: [{ "driveTrainSystemData._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Traction_Motor) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Traction_Motor": data.Traction_Motor,
          },
        },
        { arrayFilters: [{ "driveTrainSystemData._id": data._id }], returnDocument: "after" }
      )
    }
   

    if (data.Instrument_Cluster) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.Model_of_the_Instrument_Cluster.value":
              data.Instrument_Cluster.properties.Model_of_the_Instrument_Cluster.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.How_State_of_Charge_is_being_displayed.value":
              data.Instrument_Cluster.properties.How_State_of_Charge_is_being_displayed.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.State_charge_vehicle_is_Recommended_to_Charge.value":
              data.Instrument_Cluster.properties.State_charge_vehicle_is_Recommended_to_Charge.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.State_of_Charge_indication_format.value":
              data.Instrument_Cluster.properties.State_of_Charge_indication_format.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.State_of_Charge_indication_format_battry.value":
              data.Instrument_Cluster.properties.State_of_Charge_indication_format_battry.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.Relationship_of_state_of_charge_indicator.value":
              data.Instrument_Cluster.properties.Relationship_of_state_of_charge_indicator.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.Indication_of_state_of_charge_of_battery.value":
              data.Instrument_Cluster.properties.Indication_of_state_of_charge_of_battery.value,
            "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster.properties.Indication_when_Battery_completely_run_of_charge.value":
              data.Instrument_Cluster.properties.Indication_when_Battery_completely_run_of_charge.value,
          },
        },
        {
          arrayFilters: [{ "instrumentCluster._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    
    
    if (data.DC_DC_Converter) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "DC_DC_Converter.DCDCConverter.$[dCDCConverter].DC_DC_Converter": data.DC_DC_Converter,
          },
        },
        { arrayFilters: [{ "dCDCConverter._id": data._id }], returnDocument: "after" }
      )
    }
        if (data.Vehicle_Control) {
          updatedform13Data = await form13Schema.findByIdAndUpdate(
            form13._id,
            {
              $set: {
                "Vehicle_Control_Unit.VehicleControlUnit.$[vehicleControlUnit].Vehicle_Control": data.Vehicle_Control,
              },
            },
            { arrayFilters: [{ "vehicleControlUnit._id": data._id }], returnDocument: "after" }
          )
        }
    if (data.Insulating_Category) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Insulating_Category.InsulatingCategory.$[insulatingCategory].Insulating_Category": data.Insulating_Category,
          },
        },
        { arrayFilters: [{ "insulatingCategory._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Charger) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Charger_Specification.ChargerSpecification.$[chargerSpecification].Charger": data.Charger,
          },
        },
        { arrayFilters: [{ "chargerSpecification._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Specifications) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Charger_Specification.ChargerSpecification.$[chargerSpecification].Specifications": data.Specifications,
          },
        },
        { arrayFilters: [{ "chargerSpecification._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.on_board_charger) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Charger_Specification.ChargerSpecification.$[chargerSpecification].on_board_charger": data.on_board_charger,
          },
        },
        { arrayFilters: [{ "chargerSpecification._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Electrical_details_of_vehicle) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Charger_Specification.ChargerSpecification.$[chargerSpecification].Electrical_details_of_vehicle": data.Electrical_details_of_vehicle,
          },
        },
        { arrayFilters: [{ "chargerSpecification._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Portable_Residual_Current_Device_PRCD) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Charger_Specification.ChargerSpecification.$[chargerSpecification].Portable_Residual_Current_Device_PRCD": data.Portable_Residual_Current_Device_PRCD,
          },
        },
        { arrayFilters: [{ "chargerSpecification._id": data._id }], returnDocument: "after" }
      )
    }

    
    if (data.Specifications_of_circuit_breakers_or_fuses_used_for_protection_of_batteries_or_power_train) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Electrical_Safety_Device.ElectricalSafetyDevice.$[electricalSafetyDevice].Specifications_of_circuit_breakers_or_fuses_used_for_protection_of_batteries_or_power_train":
              data.Specifications_of_circuit_breakers_or_fuses_used_for_protection_of_batteries_or_power_train,
          },
        },
        { arrayFilters: [{ "electricalSafetyDevice._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Electrical_system) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Vehicle_Electrical_Specification.VehicleElectricalSpecification.$[vehicleElectricalSpecification].Electrical_system":
              data.Electrical_system,
          },
        },
        { arrayFilters: [{ "vehicleElectricalSpecification._id": data._id }], returnDocument: "after" }
      )
      if (form7 != null) {
        const item = form7.Vehicle_Electrical_Specification.VehicleElectricalSpecification.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
          {$set: {
              "Vehicle_Electrical_Specification.VehicleElectricalSpecification.$[item].Electrical_system.properties.Working_voltage_Operating_Voltage.value": data.Electrical_system.properties.Working_voltage_Operating_Voltage.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Electric_harness) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Vehicle_Electrical_Specification.VehicleElectricalSpecification.$[vehicleElectricalSpecification].Electric_harness":
              data.Electric_harness,
          },
        },
        { arrayFilters: [{ "vehicleElectricalSpecification._id": data._id }], returnDocument: "after" }
      )
    }

    if (data.Power_Controller) {
      updatedform13Data = await form13Schema.findByIdAndUpdate(
        form13._id,
        {
          $set: {
            "Controller.PowerController.$[powerController].Power_Controller": data.Power_Controller,
          },
        },
        { arrayFilters: [{ "powerController._id": data._id }], returnDocument: "after" }
      )
    }
       if (data.Performance) {
        updatedform13Data = await form13Schema.findByIdAndUpdate(
          form13._id,
          {
            $set: {
              "Vehicle_Performance.VehiclePerformance.$[vehiclePerformance].Performance": data.Performance,
            },
          },
          { arrayFilters: [{ "vehiclePerformance._id": data._id }], returnDocument: "after" }
        )
        }

    return updatedform13Data
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    return error
  }
}


const findOrCreateForm13 = async (requestId) => {
  //console.log(`inside findOrCreateForm13`)
  let form13 = await form13Schema.findOne({ homologationRequest: requestId })
    if (form13 == null) {
      //console.log(`creatng new form13 collection for supplierId: ${requestId}`)
      form13 = await form13Schema.create({
        homologationRequest: requestId,
      })
      const defaultSupplier = await getSupplierByKey();
      if(defaultSupplier){
        //console.log(`adding defaultSupplier for VehicleGeneralInformation of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleGeneralInformation(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for Generalarrangementofthevehicle of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Generalarrangementofthevehicle(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for DriveTrainSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await DriveTrainSystem(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for CoolingSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await CoolingSystem(defaultSupplier._id, form13)        
        //console.log(`adding defaultSupplier for Lubrication of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Lubrication(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for InstrumentCluster of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await InstrumentCluster(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for DCDCConverter of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await DCDCConverter(defaultSupplier._id, form13)        
        //console.log(`adding defaultSupplier for BatteryMangementSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await BatteryMangementSystem(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for InsulatingCategory of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await InsulatingCategory(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for ChargerSpecification of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await ChargerSpecification(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for ElectricalSafetyDevice of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await ElectricalSafetyDevice(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for VehicleElectricalSpecification of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleElectricalSpecification(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for Controller of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Controller(defaultSupplier._id, form13)
        //console.log(`adding defaultSupplier for VehiclePerformanceData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehiclePerformanceData(defaultSupplier._id, form13)  
        //console.log(`adding defaultSupplier for VehicleControlUnit of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleControlUnit(defaultSupplier._id, form13)
      } else{       
        //console.log(`inside findOrCreateForm13 :defaultSupplier is not found`)
      }
    }
    return form13
}

exports.findOrCreateForm13 = findOrCreateForm13

exports.insertNewForm13 = async (form) => {
  // const Form13Model = require("../mongoSchemas/form13Schema");
  return await form13Schema.create(form);
};