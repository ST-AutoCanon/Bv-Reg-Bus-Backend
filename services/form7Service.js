const form7Schema = require("../mongoSchemas/formsSchemas/form7Schema");
const form11Schema = require("../mongoSchemas/formsSchemas/form11Schema");
const { getSupplierByKey } = require("../controllers/supplierController");
const homologationRequestSchema = require("../mongoSchemas/homologationRequestSchema");
let vehicle_type;
const TyresData = async (supplierId, form7) => {
  const TyreData = {
    supplier: supplierId,
    
    Front_Tyre: {
      properties: {
        Laden: { value: "" },
        Tyre_size_designation_including_ply_rating: { value: "" },
        Speed_index: { value: "" },
        Load_index_Load_rating: { value: "" },
        Tyre_Type: { value: "" },
        tyre_vehicle_type: {
          value: vehicle_type === "2-Wheeler" ? "2-Wheeler" : "3-Wheeler",
        },
      },
    },
    // Front_Tyre: {},
    Rear_Tyre: {},
    // Any_other_Tyre:{},
  };
   //console.log(
  //   `creating data: ${JSON.stringify(TyreData)} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Tyres.TyresData": TyreData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const WheelRimData = async (supplierId, form7) => {
  const WheelRimData = {
    supplier: supplierId,
    Wheel_Rim_Size: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(WheelRimData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Wheel_Rim.WheelRim": WheelRimData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};
const DriveTrainSystem = async (supplierId, form7) => {
  const DriveTrainSystem = {
    supplier: supplierId,
    Transmission: {},
    // Clutch: {},
  };
   //console.log(
  //   `creating data: ${JSON.stringify(DriveTrainSystem)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updatedForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Drive_Train_System.DriveTrainSystemData": DriveTrainSystem } },
    { returnDocument: "after" }
  );
  //console.log(`updatedForm7Data: ${updatedForm7Data}`);
  return updatedForm7Data;
};
const TractionBatterypackData = async (supplierId, form7) => {
  const TractionBatterypackData = {
    supplier: supplierId,
    Traction_Battery_Pack: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(
  //     TractionBatterypackData
  //   )} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    {
      $push: {
        "Traction_Battery_Pack.TractionBatterypack": TractionBatterypackData,
      },
    },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const WindscreenwipingData = async (supplierId, form7) => {
  const WindscreenwipingData = {
    supplier: supplierId,
    Wiping_System: {},
  };
//console.log(
  //   `creating data: ${JSON.stringify(WindscreenwipingData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Windscreen_wiping.Windscreenwiping": WindscreenwipingData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const VehicleGeneralInformationData = async (supplierId, form7) => {
  const VehicleGeneralInformationData = {
    supplier: supplierId,
    Manufacturer_Details: {},
    Variants: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(
  //     VehicleGeneralInformationData
  //   )} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    {
      $push: {
        "Vehicle_General_Information.VehicleGeneralInformation":
          VehicleGeneralInformationData,
      },
    },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const GeneralarrangementofthevehicleData = async (supplierId, form7) => {
  const GeneralarrangementofthevehicleData = {
    supplier: supplierId,
    General_arrangement_of_the_vehicle: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(
  //     GeneralarrangementofthevehicleData
  //   )} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    {
      $push: {
        "General_arrangement_of_the_vehicle.Generalarrangementofthevehicle":
          GeneralarrangementofthevehicleData,
      },
    },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const VehicleDimensionsData = async (supplierId, form7) => {
  const VehicleDimensionsData = {
    supplier: supplierId,
    General_arrangement_of_the_vehicle_dimension: {},
    Body_Overhang: {},
    Frame: {},
    Frame_Overhang: {},
  };
 //console.log(
  //   `creating data: ${JSON.stringify(VehicleDimensionsData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    {
      $push: { "Vehicle_Dimensions.VehicleDimensions": VehicleDimensionsData },
    },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const WeightsData = async (supplierId, form7) => {
  const WeightsData = {
    supplier: supplierId,
    Kerb_Weight: {},
    Gross_Vehicle_Weight: {},
    Gradability: {},
    Maximum_Carrying_capacity: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(WeightsData)} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Weights.Weights": WeightsData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const SuspensionData = async (supplierId, form7) => {
  const SuspensionData = {
    supplier: supplierId,
    // Suspension: {},
    Front_Suspension: {},
    Rear_Suspension: {},
  };
 //console.log(
  //   `creating data: ${JSON.stringify(SuspensionData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Suspension.Suspension": SuspensionData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const BrakesData = async (supplierId, form7) => {
  const BrakesData = {
    supplier: supplierId,
    Brief_Brake_Information: {},
    Parts_of_Brake_System: {},
    ABS: {},
    Brake_Types: {},
    Free_Play_and_Ratio: {},
    Parking_Brake: {},
    Re_Generative_Brake: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(BrakesData)} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Brakes.Brakes": BrakesData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const SteeringSuspensionData = async (supplierId, form7) => {
  const SteeringData = {
    supplier: supplierId,
    Steering_System: {},
    // Suspension: {},
    Front_Suspension: {},
    Rear_Suspension: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(SteeringData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "SteeringSuspension.SteeringSuspensionData": SteeringData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const SteeringData = async (supplierId, form7) => {
  const SteeringData = {
    supplier: supplierId,
    Steering_System: {},
  };
//console.log(
  //   `creating data: ${JSON.stringify(SteeringData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    { $push: { "Steering.Steering": SteeringData } },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const VehiclePerformanceData = async (supplierId, form7) => {
  const VehiclePerformanceData = {
    supplier: supplierId,
    Performance: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(VehiclePerformanceData)} data for form7: ${
  //     form7._id
  //   }`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    {
      $push: {
        "Vehicle_Performance.VehiclePerformance": VehiclePerformanceData,
      },
    },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

const VehicleElectricalSpecification = async (supplierId, form7) => {
  const VehicleElectricalSpecification = {
    supplier: supplierId,
    Electrical_system: {},
  };
  //console.log(
  //   `creating data: ${JSON.stringify(
  //     VehicleElectricalSpecification
  //   )} data for form7: ${form7._id}`
  // );
  const updateForm7Data = await form7Schema.findByIdAndUpdate(
    form7._id,
    {
      $push: {
        "Vehicle_Electrical_Specification.VehicleElectricalSpecification":
          VehicleElectricalSpecification,
      },
    },
    { returnDocument: "after" }
  );
  //console.log(`updateForm7Data: ${updateForm7Data}`);
  return updateForm7Data;
};

exports.getForm7ForRequestId = async (requestId) => {
  try {
    const form7Data = await form7Schema
      .findOne({
        homologationRequest: requestId,
      })
      .lean()
      .populate({ path: "Tyres.TyresData.supplier" })
      .populate({ path: "Wheel_Rim.WheelRim.supplier" })
      .populate({ path: "Traction_Battery_Pack.TractionBatterypack.supplier" })
      .populate({ path: "Windscreen_wiping.Windscreenwiping.supplier" })
      .populate({
        path: "Vehicle_General_Information.VehicleGeneralInformation.supplier",
      })
      .populate({
        path: "General_arrangement_of_the_vehicle.Generalarrangementofthevehicle.supplier",
      })
      .populate({ path: "Vehicle_Dimensions.VehicleDimensions.supplier" })
      .populate({ path: "Weights.Weights.supplier" })
      .populate({ path: "Suspension.Suspension.supplier" })
      .populate({ path: "Brakes.Brakes.supplier" })
      .populate({ path: "Steering.Steering.supplier" })
      .populate({ path: "SteeringSuspension.SteeringSuspensionData.supplier" })
      .populate({ path: "Vehicle_Performance.VehiclePerformance.supplier" })
      .populate({
        path: "Vehicle_Electrical_Specification.VehicleElectricalSpecification.supplier",
      })
      .populate({ path: "Drive_Train_System.DriveTrainSystemData.supplier" });
    if (form7Data != null) {
      return form7Data;
    }
    return null;
  } catch (error) {
    //console.log(`Exception occured: ${error}`);
  }
};

exports.createEmptyForm7ComponentDataForSupplier = async (
  component,
  supplierId,
  requestId
) => {
  try {
    //console.log(`fetching form7 data for requestId: ${requestId}`);
    const form7 = await findOrCreateForm7(requestId);
    switch (component) {
      case "Tyres":
        return await TyresData(supplierId, form7);
      case "Wheel Rim":
        return await WheelRimData(supplierId, form7);
      case "Traction Battery Pack":
        return await TractionBatterypackData(supplierId, form7);
      case "Windscreen wiping":
        return await WindscreenwipingData(supplierId, form7);
      case "Vehicle General Information":
        return await VehicleGeneralInformationData(supplierId, form7);
      case "General arrangement of the vehicle":
        return await GeneralarrangementofthevehicleData(supplierId, form7);
      case "Vehicle Dimensions":
        return await VehicleDimensionsData(supplierId, form7);
      case "Weights":
        return await WeightsData(supplierId, form7);
      case "Suspension":
        return await SuspensionData(supplierId, form7);
      case "Brakes":
        return await BrakesData(supplierId, form7);
      case "Steering":
        return await SteeringData(supplierId, form7);
      case "Vehicle Performance":
        return await VehiclePerformanceData(supplierId, form7);
      case "Steering + Suspension + Handle Lock / Anti Theft Device":
        return await SteeringSuspensionData(supplierId, form7);
      case "Vehicle Electrical Specification":
        return await VehicleElectricalSpecification(supplierId, form7);
      case "Drive Train system":
        return await DriveTrainSystem(supplierId, form7);
      default:
        break;
    }
  } catch (error) {
    //console.log(`Exception occured: ${error}`);
    return error;
  }
};

exports.updateForm7Data = async (requestId, data) => {
  try {
    const form7 = await form7Schema.findOne({ homologationRequest: requestId });
    const form11 = await form11Schema.findOne({
      homologationRequest: requestId,
    });
    if (form7 == null) {
      throw new Error(`form7 doesnt exist with id: ${requestId}`);
    }
    let updatedForm7Data;
    

    if (data.Front_Tyre) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            // "Tyres.TyresData.$[tyresData].Front_Tyre": data.Front_Tyre,

            "Tyres.TyresData.$[tyresData].Front_Tyre.properties.Laden.value":
              data.Front_Tyre.properties.Laden.value,
            "Tyres.TyresData.$[tyresData].Front_Tyre.properties.Tyre_size_designation_including_ply_rating.value":
              data.Front_Tyre.properties
                .Tyre_size_designation_including_ply_rating.value,
            "Tyres.TyresData.$[tyresData].Front_Tyre.properties.Speed_index.value":
              data.Front_Tyre.properties.Speed_index.value,
            "Tyres.TyresData.$[tyresData].Front_Tyre.properties.Load_index_Load_rating.value":
              data.Front_Tyre.properties.Load_index_Load_rating.value,
            "Tyres.TyresData.$[tyresData].Front_Tyre.properties.Tyre_Type.value":
              data.Front_Tyre.properties.Tyre_Type.value,
            // "Tyres.TyresData.$[tyresData].Front_Tyre.properties.tyre_vehicle_type.value": data.Front_Tyre.properties.tyre_vehicle_type.value,
          },
        },
        {
          arrayFilters: [{ "tyresData._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Rear_Tyre) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Tyres.TyresData.$[tyresData].Rear_Tyre": data.Rear_Tyre,
          },
        },
        {
          arrayFilters: [{ "tyresData._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    

    if (data.Wheel_Rim_Size) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Wheel_Rim.WheelRim.$[wheelRim].Wheel_Rim_Size":
              data.Wheel_Rim_Size,
          },
        },
        {
          arrayFilters: [{ "wheelRim._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Traction_Battery_Pack) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Traction_Battery_Pack.TractionBatterypack.$[tractionBatterypack].Traction_Battery_Pack":
              data.Traction_Battery_Pack,
          },
        },
        {
          arrayFilters: [{ "tractionBatterypack._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Wiping_System) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Windscreen_wiping.Windscreenwiping.$[windscreenwiping].Wiping_System":
              data.Wiping_System,
          },
        },
        {
          arrayFilters: [{ "windscreenwiping._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    
   
    if (data.Manufacturer_Details) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_General_Information.VehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details.properties.Basic_model.value":
              data.Manufacturer_Details.properties.Basic_model.value,
            "Vehicle_General_Information.VehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details.properties.Type_Of_Vehicle.value":
              data.Manufacturer_Details.properties.Type_Of_Vehicle.value,
            "Vehicle_General_Information.VehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details.properties.Manufacturer_name_and_address.value":
              data.Manufacturer_Details.properties.Manufacturer_name_and_address.value,
          },
        },
        {
          arrayFilters: [{ "vehicleGeneralInformation._id": data._id }],
          returnDocument: "after", // or new: true if using Mongoose
        }
      );
    
      
    
      if (form11 != null) {
        // if (form11 ) {
        const item =
          form11.Vehicle_General_Information.vehicleGeneralInformation.find(
            (arrItem) =>
              arrItem.supplier &&
              arrItem.supplier.toString() === data.supplier._id
          );
        if (item != null) {
          await form11Schema.findByIdAndUpdate(
            form11._id,
            {
              $set: {
                "Vehicle_General_Information.vehicleGeneralInformation.$[item].Manufacturer_Details.properties.Manufacturer_name_and_address.value":
                  data.Manufacturer_Details.properties
                    .Manufacturer_name_and_address.value,
              },
            },
            { arrayFilters: [{ "item._id": item._id }] }
          );
        }
      }
    }
    if (data.Variants) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_General_Information.VehicleGeneralInformation.$[vehicleGeneralInformation].Variants":
              data.Variants,
          },
        },
        {
          arrayFilters: [{ "vehicleGeneralInformation._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.General_arrangement_of_the_vehicle) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "General_arrangement_of_the_vehicle.Generalarrangementofthevehicle.$[generalarrangementofthevehicle].General_arrangement_of_the_vehicle":
              data.General_arrangement_of_the_vehicle,
          },
        },
        {
          arrayFilters: [{ "generalarrangementofthevehicle._id": data._id }],
          returnDocument: "after",
        }
      );
    }

    if (data.General_arrangement_of_the_vehicle_dimension) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_Dimensions.VehicleDimensions.$[vehicleDimensions].General_arrangement_of_the_vehicle_dimension":
              data.General_arrangement_of_the_vehicle_dimension,
          },
        },
        {
          arrayFilters: [{ "vehicleDimensions._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Body_Overhang) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_Dimensions.VehicleDimensions.$[vehicleDimensions].Body_Overhang":
              data.Body_Overhang,
          },
        },
        {
          arrayFilters: [{ "vehicleDimensions._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Frame) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_Dimensions.VehicleDimensions.$[vehicleDimensions].Frame":
              data.Frame,
          },
        },
        {
          arrayFilters: [{ "vehicleDimensions._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Frame_Overhang) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_Dimensions.VehicleDimensions.$[vehicleDimensions].Frame_Overhang":
              data.Frame_Overhang,
          },
        },
        {
          arrayFilters: [{ "vehicleDimensions._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    

    if (data.Kerb_Weight) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Weights.Weights.$[weights].Kerb_Weight.properties.Kerb_weight_front_axle.value":
              data.Kerb_Weight.properties.Kerb_weight_front_axle.value,
            "Weights.Weights.$[weights].Kerb_Weight.properties.Kerb_weight_rear_axle.value":
              data.Kerb_Weight.properties.Kerb_weight_rear_axle.value,
            "Weights.Weights.$[weights].Kerb_Weight.properties.Kerb_weight_Total.value":
              data.Kerb_Weight.properties.Kerb_weight_Total.value,
          },
        },
        {
          arrayFilters: [{ "weights._id": data._id }],
          returnDocument: "after", // or new: true in Mongoose
        }
      );
    }
    
    
    
    

  
    if (data.Gross_Vehicle_Weight) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Weights.Weights.$[weights].Gross_Vehicle_Weight.properties.GVW_Distribution_on_front_axle.value":
              data.Gross_Vehicle_Weight.properties.GVW_Distribution_on_front_axle.value,
            "Weights.Weights.$[weights].Gross_Vehicle_Weight.properties.GVW_Distribution_on_rear_axle.value":
              data.Gross_Vehicle_Weight.properties.GVW_Distribution_on_rear_axle.value,
          },
        },
        {
          arrayFilters: [{ "weights._id": data._id }],
          returnDocument: "after", // or new: true if using Mongoose
        }
      );
    }
    
    
    if (data.Maximum_Carrying_capacity) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Weights.Weights.$[weights].Maximum_Carrying_capacity":
              data.Maximum_Carrying_capacity,
          },
        },
        { arrayFilters: [{ "weights._id": data._id }], returnDocument: "after" }
      );
    }
    if (data.Gradability) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Weights.Weights.$[weights].Gradability": data.Gradability,
          },
        },
        { arrayFilters: [{ "weights._id": data._id }], returnDocument: "after" }
      );
    }
    

    if (data.Front_Suspension) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Suspension.Suspension.$[suspension].Front_Suspension":
              data.Front_Suspension,
          },
        },
        {
          arrayFilters: [{ "suspension._id": data._id }],
          returnDocument: "after",
        }
      );
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "SteeringSuspension.SteeringSuspensionData.$[suspension].Front_Suspension":
              data.Front_Suspension,
          },
        },
        {
          arrayFilters: [{ "suspension._id": data._id }],
          returnDocument: "after",
        }
      );
    }

    if (data.Rear_Suspension) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Suspension.Suspension.$[suspension].Rear_Suspension":
              data.Rear_Suspension,
          },
        },
        {
          arrayFilters: [{ "suspension._id": data._id }],
          returnDocument: "after",
        }
      );
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "SteeringSuspension.SteeringSuspensionData.$[suspension].Rear_Suspension":
              data.Rear_Suspension,
          },
        },
        {
          arrayFilters: [{ "suspension._id": data._id }],
          returnDocument: "after",
        }
      );
    }

    if (data.Parking_Brake) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].Parking_Brake": data.Parking_Brake,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    
    
    if (data.Re_Generative_Brake) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].Re_Generative_Brake":
              data.Re_Generative_Brake,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    if (data.Brief_Brake_Information) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].Brief_Brake_Information":
              data.Brief_Brake_Information,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    if (data.Parts_of_Brake_System) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].Parts_of_Brake_System":
              data.Parts_of_Brake_System,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    if (data.ABS) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].ABS": data.ABS,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    if (data.Brake_Types) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].Brake_Types": data.Brake_Types,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    if (data.Free_Play_and_Ratio) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Brakes.Brakes.$[brakes].Free_Play_and_Ratio":
              data.Free_Play_and_Ratio,
          },
        },
        { arrayFilters: [{ "brakes._id": data._id }], returnDocument: "after" }
      );
    }
    
   

    if (data.Steering_System) {
      const updateData = {
        "Steering_wheel_diameter.value": data.Steering_System.properties.Steering_wheel_diameter.value,
      };
    
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Steering.Steering.$[steering].Steering_System.properties.Steering_wheel_diameter.value":
              updateData["Steering_wheel_diameter.value"],
          },
        },
        { arrayFilters: [{ "steering._id": data._id }], returnDocument: "after" }
      );
    
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "SteeringSuspension.SteeringSuspensionData.$[steering].Steering_System.properties.Steering_wheel_diameter.value":
              updateData["Steering_wheel_diameter.value"],
          },
        },
        { arrayFilters: [{ "steering._id": data._id }], returnDocument: "after" }
      );
    }
    
    if (data.Performance) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_Performance.VehiclePerformance.$[vehiclePerformance].Performance":
              data.Performance,
          },
        },
        {
          arrayFilters: [{ "vehiclePerformance._id": data._id }],
          returnDocument: "after",
        }
      );
    }
    if (data.Electrical_system) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            "Vehicle_Electrical_Specification.VehicleElectricalSpecification.$[vehicleElectricalSpecification].Electrical_system":
              data.Electrical_system,
          },
        },
        {
          arrayFilters: [{ "vehicleElectricalSpecification._id": data._id }],
          returnDocument: "after",
        }
      );
    }

    if (data.Transmission) {
      updatedForm7Data = await form7Schema.findByIdAndUpdate(
        form7._id,
        {
          $set: {
            // "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Transmission": data.Transmission,
            "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Transmission.properties.Make_or_Model.value":
              data.Transmission.properties.Make_or_Model.value,
            "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Transmission.properties.Number_of_gears.value":
              data.Transmission.properties.Number_of_gears.value,
          },
        },
        {
          arrayFilters: [{ "driveTrainSystemData._id": data._id }],
          returnDocument: "after",
        }
      );
    }

    return updatedForm7Data;
  } catch (error) {
    //console.log(`Exception occured: ${error}`);
    return error;
  }
};

const findOrCreateForm7 = async (requestId) => {
  //console.log(`inside findOrCreateForm7`);
  let form7 = await form7Schema.findOne({ homologationRequest: requestId });
  if (form7 == null) {
    //console.log(`creatng new form7 collection for requestId: ${requestId}`);
    form7 = await form7Schema.create({
      homologationRequest: requestId,
    });
    const defaultSupplier = await getSupplierByKey();
    if (defaultSupplier) {
      const requestData = await homologationRequestSchema.findById(requestId);
       //console.log(
      //   `adding defaultSupplier for VehicleGeneralInformationData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await VehicleGeneralInformationData(defaultSupplier._id, form7);
    // console.log(
    //     `adding defaultSupplier for GeneralarrangementofthevehicleData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
    //   );
      await GeneralarrangementofthevehicleData(defaultSupplier._id, form7);
   //console.log(
      //   `adding defaultSupplier for VehicleDimensionsData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await VehicleDimensionsData(defaultSupplier._id, form7);
    //console.log(
      //   `adding defaultSupplier for WeightsData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await WeightsData(defaultSupplier._id, form7);
    //console.log(
      //   `adding defaultSupplier for BrakesData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await BrakesData(defaultSupplier._id, form7);
     //console.log(
      //   `adding defaultSupplier for VehiclePerformanceData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await VehiclePerformanceData(defaultSupplier._id, form7);
       //console.log(
      //   `adding defaultSupplier for VehicleElectricalSpecification of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await VehicleElectricalSpecification(defaultSupplier._id, form7);
      //console.log(
      //   `adding defaultSupplier for DriveTrainSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
      // );
      await DriveTrainSystem(defaultSupplier._id, form7);
      if (requestData.vehicle_type.value === "2-Wheeler") {
        vehicle_type = "2-Wheeler";
       //console.log(
        //   `adding defaultSupplier for SuspensionData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
        // );
        await SuspensionData(defaultSupplier._id, form7);
      } else {
        vehicle_type = "3-Wheeler";
       //console.log(
        //   `adding defaultSupplier for SteeringSuspensionData of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`
        // );
        await SteeringSuspensionData(defaultSupplier._id, form7);
      }
    } else {
      //console.log(`inside findOrCreateForm7 :defaultSupplier is not found`);
    }
  }
  return form7;
};

exports.findOrCreateForm7 = findOrCreateForm7;

exports.insertNewForm7 = async (form) => {
  // const Form7Model = require("../mongoSchemas/form7Schema");
  return await form7Schema.create(form);
};