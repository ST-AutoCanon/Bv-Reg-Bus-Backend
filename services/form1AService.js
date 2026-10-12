const form1ASchema = require("../mongoSchemas/formsSchemas/form1ASchema");
const form7Schema = require("../mongoSchemas/formsSchemas/form7Schema")
const form8Schema = require("../mongoSchemas/formsSchemas/form8Schema")
const form11Schema = require("../mongoSchemas/formsSchemas/form11Schema")
const form13Schema = require("../mongoSchemas/formsSchemas/form13Schema")
const homologationRequestSchema = require("../mongoSchemas/homologationRequestSchema");
let vehicle_type;
const {getSupplierByKey} = require('../controllers/supplierController')


const Tyres = async (supplierId, form1A) => {
  const Tyres = {
    supplier: supplierId,
    // Front_Tyre: {},
    Front_Tyre: {
      properties: {
        Variant: { value:'' },
        Type: { value:'' },
        Size: { value: '' },
        Make: { value:'' },
        TAC: { value:'' },
        Dynamic_rolling: { value:'' },     
        tyre_vehicle_type: { value: vehicle_type === '2-Wheeler' ? '2-Wheeler' : '3-Wheeler' },
      },
    },
    Rear_Tyre:{},
    Any_other_Tyre:{},
    Tyre_Description:{},
  }
  //console.log(`creating data: ${JSON.stringify(Tyres)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Tyres.TyresData": Tyres } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const WheelRim = async (supplierId, form1A) => {
  const WheelRim = {
    supplier: supplierId,
    Front_Wheel_Rim: {},
    Rear_Wheel_Rim:{},
  }
  //console.log(`creating data: ${JSON.stringify(WheelRim)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Wheel_Rim.WheelRim": WheelRim } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const HydraulicBrakeHose = async (supplierId, form1A) => {
  const HydraulicBrakeHose = {
    supplier: supplierId,
    Hydraulic_Brake_Hose: {},
  }
  //console.log(`creating data: ${JSON.stringify(HydraulicBrakeHose)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Hydraulic_Brake_Hose.HydraulicBrakeHose": HydraulicBrakeHose } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const DaytimeRunningLampData = async (supplierId, form1A) => {
  const DaytimeRunningLamp = {
    supplier: supplierId,
    Daytime_Running_Lamp: {},
    Daytime_Running_Lamp_Led: {},
  }
  //console.log(`creating data: ${JSON.stringify(DaytimeRunningLamp)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Daytime_Running_Lamp.DaytimeRunningLamp": DaytimeRunningLamp } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const Horn = async (supplierId, form1A) => {
  const Horn = {
    supplier: supplierId,
    Horn: {},
  }
  //console.log(`creating data: ${JSON.stringify(Horn)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Horn.Horn": Horn } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const LigthingSignalingDevice = async (supplierId, form1A) => {
  const LigthingSignaling = {
    supplier: supplierId,
    Headline: {},
    Annexure_1: {},
    Annexure_2: {},
  }
  //console.log(`creating data: ${JSON.stringify(LigthingSignaling)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Ligthing_Signaling.LigthingSignaling": LigthingSignaling } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const HeadLamp = async (supplierId, form1A) => {
  const HeadLamp = {
    supplier: supplierId,
    Main_Beam_Head_Lamp: {},
    Main_Beam_Headlamp_Filament_Type: {},
    Dipped_Beam_Headlamp_LED_Type: {},
    Dipped_Beam_Headlamp_Filament_Type: {},
  }
  //console.log(`creating data: ${JSON.stringify(HeadLamp)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Head_Lamp.HeadLamp": HeadLamp } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const PositionLamps = async (supplierId, form1A) => {
  const PositionLamps = {
    supplier: supplierId,
    Front_Position_Lamp_LED_Type: {},
    Front_Position_Lamp_Bulb_Type: {},
    Front_Parking_Lamp_LED_Type: {},
    Front_Parking_Lamp_Bulb_type: {},
    // Parking_Lamp_Led_Rear: {},
    Parking_Lamp_Bulb_Rear: {},
    Rear_Position_Lamp_LED_Type:{},
    Rear_Position_Lamp_Bulb_Type:{},
    Stop_Lamp_LED_Type: {},
    Stop_Lamp_bulb_Type: {},
  }
  //console.log(`creating data: ${JSON.stringify(PositionLamps)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Position_Lamps.PositionLamps": PositionLamps } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const RearRegistrationPlate = async (supplierId, form1A) => {
  const RearRegistrationPlate = {
    supplier: supplierId,
    Registration_Plate_Lamp_LED_Type: {},
    Registration_Plate_Lamp_bulb_type: {},
  }
  //console.log(`creating data: ${JSON.stringify(RearRegistrationPlate)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Rear_Registration_Plate.RearRegistrationPlate": RearRegistrationPlate } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const DirectionIndicatorLamp = async (supplierId, form1A) => {
  const DirectionIndicatorLamp = {
    supplier: supplierId,
    Front_Dir_Indicator_LED_Type: {},
    Front_Dir_indicator_Bulb_Type: {},
    Rear_Direction_Indicator_LED_Type: {},
    Rear_Direction_Indicator_Bulb_Type: {},
    Side_Direction_Indicator: {},
  }
  //console.log(`creating data: ${JSON.stringify(DirectionIndicatorLamp)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Direction_Indicator_Lamp.DirectionIndicatorLamp": DirectionIndicatorLamp } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const HazardWarningLamp = async (supplierId, form1A) => {
  const HazardWarningLamp = {
    supplier: supplierId,
    Hazard_Warn_lamp_Front_Led: {},
    Front_Dir_indicator_Bulb_Type: {},
    Hazard_warning_Lamp_LED_Type: {},
    Rear_Hazard_Lamp: {},
    Side_Hazard_Lamp: {},
  }
  //console.log(`creating data: ${JSON.stringify(HazardWarningLamp)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Hazard_Warning_Lamp.HazardWarningLamp": HazardWarningLamp } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const RetroReflectors = async (supplierId, form1A) => {
  const RetroReflectors = {
    supplier: supplierId,
    Front_White_Reflector: {},
    Rear_Red_Reflector: {},
    Side_Amber_Reflector: {},
    // Rear_Hazard_Lamp: {},
    // Side_Hazard_Lamp: {},
    Reflective_Tape: {},
  }
  //console.log(`creating data: ${JSON.stringify(RetroReflectors)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Retro_Reflectors.RetroReflectors": RetroReflectors } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const BrakeFluid = async (supplierId, form1A) => {
  const BrakeFluid = {
    supplier: supplierId,
    Hydraulic_Brake_Fluid: {},
  }
  //console.log(`creating data: ${JSON.stringify(BrakeFluid)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Brake_Fluid.BrakeFluid": BrakeFluid } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const VehicleControlUnit = async (supplierId, form1A) => {
  const VehicleControlUnit = {
    supplier: supplierId,
    Vehicle_Control: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleControlUnit)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Vehicle_Control_Unit.VehicleControlUnit": VehicleControlUnit } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const RearViewMirror = async (supplierId, form1A) => {
  const RearViewMirror = {
    supplier: supplierId,
    Rear_View_Mirror: {},
  }
  //console.log(`creating data: ${JSON.stringify(RearViewMirror)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Rear_View_Mirror.RearViewMirror": RearViewMirror } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const ReversingLamp = async (supplierId, form1A) => {
  const ReversingLamp = {
    supplier: supplierId,
    Reversing_Lamp: {},
    Reverse_Lamp_Bulb_Type: {},
  }
  //console.log(`creating data: ${JSON.stringify(ReversingLamp)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Reversing_Lamp.ReversingLamp": ReversingLamp } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const VehicleGeneralInformation = async (supplierId, form1A) => {
  const VehicleGeneralInformation = {
    supplier: supplierId,
    Manufacturer_Details: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleGeneralInformation)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Vehicle_General_Information.VehicleGeneralInformation": VehicleGeneralInformation } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const GeneralArrangementVehicle = async (supplierId, form1A) => {
  const GeneralArrangementVehicle = {
    supplier: supplierId,
    General_arrangement_vehicle: {},
  }
  //console.log(`creating data: ${JSON.stringify(GeneralArrangementVehicle)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "General_arrangement_vehicle.GeneralArrangementVehicle": GeneralArrangementVehicle } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

// const VehicleDimensions = async (supplierId, form1A) => {
//   const VehicleDimensions = {
//     supplier: supplierId,
//     General_arrangement_vehicle: {},
//   }
//   //console.log(`creating data: ${JSON.stringify(VehicleDimensions)} data for form1A: ${form1A._id}`)
//   const updateform1AData = await form1ASchema.findByIdAndUpdate(
//     form1A._id,
//     { $push: { "Vehicle_Dimensions.VehicleDimensions": VehicleDimensions } },
//     { returnDocument: "after" }
//   )
//   //console.log(`updateform1AData: ${updateform1AData}`)
//   return updateform1AData
// }

const Weights = async (supplierId, form1A) => {
  const Weights = {
    supplier: supplierId,
    Kerb_Weight: {},
    Gross_Vehicle_Weight: {},
    Maximum_Carrying_capacity: {},
  }
  //console.log(`creating data: ${JSON.stringify(Weights)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Weights.WeightsData": Weights } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const Suspension = async (supplierId, form1A) => {
  const Suspension = {
    supplier: supplierId,
    Suspension: {},
  }
  //console.log(`creating data: ${JSON.stringify(Suspension)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Suspension.SuspensionData": Suspension } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const Brakes = async (supplierId, form1A) => {
  const Brakes = {
    supplier: supplierId,
    Brief_Brake_Information: {},
    Parts_of_Brake_System: {},
    ABS: {},
    // Drawing: {},
    ECU: {},
    BrakeTypes: {},
    Service_Brake_Controls: {},
    Free_Play_Ratio: {},
    Wheel_Cylinders: {},
    Parking_Brake: {},
    Re_Generative_Brake:{},
  }
  //console.log(`creating data: ${JSON.stringify(Brakes)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Brakes.BrakesData": Brakes } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}
const TwoWheelerAggregates = async (supplierId, form1A) => {
  const TwoWheelerAggregates = {
    supplier: supplierId,
    Grab_handle_Straps: {},
    Two_Wheeler_Foot_Rest: {},
    Spray_Suppression_Rear_Mud_Gaurd: {},
    Two_Wheeler_Stand: {},
  }
  //console.log(`creating data: ${JSON.stringify(TwoWheelerAggregates)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Two_Wheeler_Aggregates.TwoWheelerAggregatesData": TwoWheelerAggregates } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}
const SteeringSuspensionAntiTheft = async (supplierId, form1A) => {
  const SteeringSuspensionAntiTheft = {
    supplier: supplierId,
    Steering_System: {},
    Suspension: {},
    Lock_Anti_theft_device: {},
  }
  //console.log(`creating data: ${JSON.stringify(SteeringSuspensionAntiTheft)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "SteeringSuspensionAntiTheft.SteeringSuspensionAntiTheftData": SteeringSuspensionAntiTheft } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const VehicleControlsLocation = async (supplierId, form1A) => {
  const VehicleControlsLocation = {
    supplier: supplierId,
    Vehicle_Controls: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleControlsLocation)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Vehicle_Controls_and_Their_Location.VehicleControlsLocation": VehicleControlsLocation } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const TellTales = async (supplierId, form1A) => {
  const TellTales = {
    supplier: supplierId,
    Tell_Tales: {},
  }
  //console.log(`creating data: ${JSON.stringify(TellTales)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Tell_Tales.TellTales": TellTales } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const Indicators = async (supplierId, form1A) => {
  const Indicators = {
    supplier: supplierId,
    Indicators: {},
  }
  //console.log(`creating data: ${JSON.stringify(Indicators)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Indicators.IndicatorsData": Indicators } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const VehicleIdentificationNumber = async (supplierId, form1A) => {
  const VehicleIdentificationNumber = {
    supplier: supplierId,
    VINNumbering: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehicleIdentificationNumber)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Vehicle_Identification_Number.VehicleIdentificationNumber": VehicleIdentificationNumber } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const HandleLock = async (supplierId, form1A, requestId) => {
  const HandleLock = {
    supplier: supplierId,
    Lock_Anti_theft_device: {},
  }
  //console.log(`creating data: ${JSON.stringify(HandleLock)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Handle_Lock_Anti_Theft_Device.HandleLock": HandleLock } },
    { returnDocument: "after" }
  )

  if(requestId != null){
    const form8 = await form8Schema.findOne({ homologationRequest: requestId })
    //console.log(`form8: ${JSON.stringify(form8)}`)
    if(form8 != null){
      const HandleLock = {
        supplier: supplierId,
        Protective_Device_Handle_Lock: {},
      }
      //console.log(`creating data: ${JSON.stringify(HandleLock)} data for form8: ${form8._id}`)
      await form8Schema.findByIdAndUpdate(
        form8._id,
        { $push: { "Handle_Lock.HandleLock": HandleLock } },
        { returnDocument: "after" }
      )
    }
  }

  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const GrabHandle = async (supplierId, form1A) => {
  const GrabHandle = {
    supplier: supplierId,
    Grab_handle_Straps: {},
  }
  //console.log(`creating data: ${JSON.stringify(GrabHandle)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Grab_handle.GrabHandle": GrabHandle } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const TwoWheelerExternalProjection = async (supplierId, form1A) => {
  const TwoWheelerExternalProjection = {
    supplier: supplierId,
    External_Projection_Details: {},
  }
  //console.log(`creating data: ${JSON.stringify(TwoWheelerExternalProjection)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Two_Wheeler_External_Projection.TwoWheelerExternalProjection": TwoWheelerExternalProjection } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const DriveTrainSystem = async (supplierId, form1A) => {
  const DriveTrainSystem = {
    supplier: supplierId,
    Transmission: {},
    Clutch:{}
  }
  //console.log(`creating data: ${JSON.stringify(DriveTrainSystem)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Drive_Train_System.DriveTrainSystemData": DriveTrainSystem } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const FireFightingSystem = async (supplierId, form1A) => {
  const FireFightingSystem = {
    supplier: supplierId,
    Fire_Fighting_System: {},
  }
  //console.log(`creating data: ${JSON.stringify(FireFightingSystem)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "FireFightingSystem.FireFightingSystemData": FireFightingSystem } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const VehiclePerformance = async (supplierId, form1A) => {
  const VehiclePerformance = {
    supplier: supplierId,
    Vehicle_Performance: {},
  }
  //console.log(`creating data: ${JSON.stringify(VehiclePerformance)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "VehiclePerformance.VehiclePerformanceData": VehiclePerformance } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const Dimension = async (supplierId, form1A) => {
  const Dimension = {
    supplier: supplierId,
    Dimension: {},
  }
  //console.log(`creating data: ${JSON.stringify(Dimension)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Dimension.DimensionData": Dimension } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const Payload = async (supplierId, form1A) => {
  const Payload = {
    supplier: supplierId,
    Payload: {},
  }
  //console.log(`creating data: ${JSON.stringify(Payload)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Payload.PayloadData": Payload } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const WindscreenWipingSystem = async (supplierId, form1A, requestId) => {
  const WindscreenWipingSystem = {
    supplier: supplierId,
    Other_Glazing: {},
    Windscreen_and_Wiping_System: {},
    Wiper_Motor: {},
    Windscreen_wiper: {},
    Wiper_arm: {},
    Wiper_Blade: {},
    Washer_Tank: {},
    Washer_tank_motor_or_Washer_Pump_if_provided: {},

  }
  //console.log(`creating data: ${JSON.stringify(WindscreenWipingSystem)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Windscreen_and_Wiping_System.WindscreenAndWipingSystem": WindscreenWipingSystem } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)

  const form8 = await form8Schema.findOne({ homologationRequest: requestId })
  //console.log(`form8: ${JSON.stringify(form8)}`)
  if(form8 != null){
    const WindscreenSchema = {
      supplier: supplierId,
      Windscreen: {},
    }
    //console.log(`creating data: ${JSON.stringify(WindscreenSchema)} data for form8: ${form8._id}`)
    const test = await form8Schema.findByIdAndUpdate(
      form8._id,
      { $push: { "Wind_screen.Windscreen": WindscreenSchema } },
      { returnDocument: "after" }
    )
    //console.log(`test: ${test}`)
  }
  return updateform1AData
}
 
const SeatingArrangement = async (supplierId, form1A) => {
  const SeatingArrangement = {
    supplier: supplierId,
    Seating_Arrangement: {},
  }
  //console.log(`creating data: ${JSON.stringify(SeatingArrangement)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Seating_Arrangement.SeatingArrangementData": SeatingArrangement } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

// const RPoint = async (supplierId, form1A) => {
//   const RPoint = {
//     supplier: supplierId,
//     R_Point: {},
//   }
//   //console.log(`creating data: ${JSON.stringify(RPoint)} data for form1A: ${form1A._id}`)
//   const updateform1AData = await form1ASchema.findByIdAndUpdate(
//     form1A._id,
//     { $push: { "RPoint.RPointData": RPoint } },
//     { returnDocument: "after" }
//   )
//   //console.log(`updateform1AData: ${updateform1AData}`)
//   return updateform1AData
// }

const SeatingDimension = async (supplierId, form1A) => {
  const SeatingDimension = {
    supplier: supplierId,
    SeatingDimension: {},
    R_Point: {},
  }
  //console.log(`creating data: ${JSON.stringify(SeatingDimension)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "SeatingDimension.SeatingDimensionData": SeatingDimension } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const HPoint = async (supplierId, form1A) => {
  const HPoint = {
    supplier: supplierId,
    HPoint: {},
  }
  //console.log(`creating data: ${JSON.stringify(HPoint)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "H_Point.HPointData": HPoint } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const RearEntryProvision = async (supplierId, form1A) => {
  const RearEntryProvision = {
    supplier: supplierId,
    Rear_Entry_Provision: {},
  }
  //console.log(`creating data: ${JSON.stringify(RearEntryProvision)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Rear_Entry_Provision.RearEntryProvision": RearEntryProvision } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const InstrumentCluster = async (supplierId, form1A) => {
  const InstrumentCluster = {
    supplier: supplierId,
    Instrument_Cluster: {},
  }
  //console.log(`creating data: ${JSON.stringify(InstrumentCluster)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Instrument_Cluster.InstrumentCluster": InstrumentCluster } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

const CriticalElectricalDevices = async (supplierId, form1A) => {
  const CriticalElectricalDevices = {
    supplier: supplierId,
    Critical_Electrical_Devices: {},
  }
  //console.log(`creating data: ${JSON.stringify(CriticalElectricalDevices)} data for form1A: ${form1A._id}`)
  const updateform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    { $push: { "Critical_Electrical_Devices.CriticalElectricalDevices": CriticalElectricalDevices } },
    { returnDocument: "after" }
  )
  //console.log(`updateform1AData: ${updateform1AData}`)
  return updateform1AData
}

exports.getForm1AForRequestId = async (requestId) => {
  try {
    const form1AData = await form1ASchema.findOne({
      homologationRequest: requestId,
    }).lean()
    .populate({path: "Tyres.TyresData.supplier"})
    .populate({path:"Wheel_Rim.WheelRim.supplier"})
    .populate({path:"Horn.Horn.supplier"})
    // .populate({path:"Ligthing_Signaling.LigthingSignaling.supplier"})
    .populate({path:"Head_Lamp.HeadLamp.supplier"})
    .populate({path:"Position_Lamps.PositionLamps.supplier"})
    .populate({path:"Rear_Registration_Plate.RearRegistrationPlate.supplier"})
    .populate({path:"Direction_Indicator_Lamp.DirectionIndicatorLamp.supplier"})
    .populate({path:"Hazard_Warning_Lamp.HazardWarningLamp.supplier"})
    .populate({path:"Retro_Reflectors.RetroReflectors.supplier"})
    .populate({path:"Hydraulic_Brake_Hose.HydraulicBrakeHose.supplier"})
    .populate({ path: "Daytime_Running_Lamp.DaytimeRunningLamp.supplier" })
    .populate({path:"Brake_Fluid.BrakeFluid.supplier"})
    .populate({path:"Vehicle_Control_Unit.VehicleControlUnit.supplier"})    
    .populate({path:"Rear_View_Mirror.RearViewMirror.supplier"})
    .populate({path:"Reversing_Lamp.ReversingLamp.supplier"})
    .populate({path:"Vehicle_General_Information.VehicleGeneralInformation.supplier"})
    .populate({path:"General_arrangement_vehicle.GeneralArrangementVehicle.supplier"})
    // .populate({path:"Vehicle_Dimensions.VehicleDimensions.supplier"})
    .populate({path:"Weights.WeightsData.supplier"})
    .populate({path:"Suspension.SuspensionData.supplier"})
    .populate({path:"Brakes.BrakesData.supplier"})
    .populate({path:"SteeringSuspensionAntiTheft.SteeringSuspensionAntiTheftData.supplier"})
    .populate({path:"Vehicle_Controls_and_Their_Location.VehicleControlsLocation.supplier"})
    .populate({path:"Tell_Tales.TellTales.supplier"})
    .populate({path:"Indicators.IndicatorsData.supplier"})
    .populate({path:"Vehicle_Identification_Number.VehicleIdentificationNumber.supplier"})
    .populate({path:"Handle_Lock_Anti_Theft_Device.HandleLock.supplier"})
    .populate({path:"Grab_handle.GrabHandle.supplier"})
    .populate({path:"Two_Wheeler_Aggregates.TwoWheelerAggregatesData.supplier"})
    .populate({path:"Two_Wheeler_External_Projection.TwoWheelerExternalProjection.supplier"})
    .populate({path:"Drive_Train_System.DriveTrainSystemData.supplier"})
    .populate({path:"FireFightingSystem.FireFightingSystemData.supplier"})
    .populate({path:"VehiclePerformance.VehiclePerformanceData.supplier"})
    .populate({path:"Dimension.DimensionData.supplier"})
    .populate({path:"Payload.PayloadData.supplier"})
    .populate({path:"Windscreen_and_Wiping_System.WindscreenAndWipingSystem.supplier"})
    .populate({path:"Seating_Arrangement.SeatingArrangementData.supplier"})
    // .populate({path:"RPoint.RPointData.supplier"})
    .populate({path:"SeatingDimension.SeatingDimensionData.supplier"})
    .populate({path:"H_Point.HPointData.supplier"})
    .populate({path:"Rear_Entry_Provision.RearEntryProvision.supplier"})
    .populate({path:"Instrument_Cluster.InstrumentCluster.supplier"})
    .populate({path:"Critical_Electrical_Devices.CriticalElectricalDevices.supplier"})
    
    if (form1AData != null) {
      return form1AData;
    }
    return null;
  } catch (error) {
    //console.log(`Exception occured: ${error}`);
    res.status(200).json({
      status: "failure",
      body: error,
    });
  }
};

exports.createEmptyForm1AComponentDataForSupplier = async (component, supplierId, requestId) => {
  try {
    //console.log(`fetching form1A data for requestId: ${requestId}`)
    const form1A = await findOrCreateForm1A(requestId)
    switch (component) {
      case "Tyres":
        return await Tyres(supplierId, form1A)
      case "Wheel Rim":
        return await WheelRim(supplierId, form1A)
      case "Horn":
        return await Horn(supplierId, form1A)
      // case "Lighting and light-signaling devices":
      //     return await LigthingSignalingDevice(supplierId, form1A)
      case "Head Lamp":
        return await HeadLamp(supplierId, form1A)
      case "Position Lamps":
        return await PositionLamps(supplierId, form1A)
      case "Rear Registration Plate / Number Plate lamp":
        return await RearRegistrationPlate(supplierId, form1A)
      case "Direction Indicator Lamp":
        return await DirectionIndicatorLamp(supplierId, form1A)
      case "Hazard Warning Lamp":
        return await HazardWarningLamp(supplierId, form1A)
      case "Retro Reflectors":
        return await RetroReflectors(supplierId, form1A)
      case "Hydraulic Brake Hose":
        return await HydraulicBrakeHose(supplierId, form1A)
        case "Daytime Running Lamp":
          return await DaytimeRunningLampData(supplierId, form1A)
      case "Brake Fluid":
        return await BrakeFluid(supplierId, form1A)
        case "Vehicle Control Unit":
          return await VehicleControlUnit(supplierId, form1A)        
      case "Rear View Mirror":
        return await RearViewMirror(supplierId, form1A)
      case "Reversing Lamp":
        return await ReversingLamp(supplierId, form1A)
      case "Vehicle General Information":
        return await VehicleGeneralInformation(supplierId, form1A)
      case "General arrangement of the vehicle":
        return await GeneralArrangementVehicle(supplierId, form1A)
      // case "Vehicle Dimensions":
      //   return await VehicleDimensions(supplierId, form1A)
      case "Weights":
        return await Weights(supplierId, form1A)
      case "Suspension":
        return await Suspension(supplierId, form1A)
      case "Brakes":
        return await Brakes(supplierId, form1A)
      case "Steering + Suspension + Handle Lock / Anti Theft Device":
        return await SteeringSuspensionAntiTheft(supplierId, form1A)
      case "Vehicle Controls and Their Location":
        return await VehicleControlsLocation(supplierId, form1A)
      case "Tell Tales":
        return await TellTales(supplierId, form1A)
      case "Indicators":
        return await Indicators(supplierId, form1A)
      case "Vehicle Identification Number":
        return await VehicleIdentificationNumber(supplierId, form1A)
      case "Handle Lock / Anti Theft Device":
        return await HandleLock(supplierId, form1A, requestId)
      case "Two Wheeler Aggregates":
        return await TwoWheelerAggregates(supplierId, form1A)
      case "Grab handle":
        return await GrabHandle(supplierId, form1A)
      case "Two Wheeler External Projection":
        return await TwoWheelerExternalProjection(supplierId, form1A)
      case "Drive Train system":
        return await DriveTrainSystem(supplierId, form1A)
      case "Fire Fighting System":
        return await FireFightingSystem(supplierId, form1A)
      case "Vehicle Performance":
        return await VehiclePerformance(supplierId, form1A)
      case "Dimension":
        return await Dimension(supplierId, form1A)
      case "Payload":
        return await Payload(supplierId, form1A)
      case "Windscreen and Wiping System":
        return await WindscreenWipingSystem(supplierId, form1A, requestId)
      case "Seating Arrangement":
        return await SeatingArrangement(supplierId, form1A)
      // case "R Point":
      //   return await RPoint(supplierId, form1A)
      case "Seating Dimension":
        return await SeatingDimension(supplierId, form1A)
      case "H Point":
        return await HPoint(supplierId, form1A)
      case "Rear Entry Provision":
        return await RearEntryProvision(supplierId, form1A)
      case "Instrument Cluster":
        return await InstrumentCluster(supplierId, form1A)
      case "Critical Electrical Devices":
        return await CriticalElectricalDevices(supplierId, form1A)      
      default:
        break
    }
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    return error
  }
}

exports.updateform1AData = async (requestId, data) => {
  try {
    const form1A = await form1ASchema.findOne({ homologationRequest: requestId })
    const form7 = await form7Schema.findOne({ homologationRequest: requestId })
    const form8 = await form8Schema.findOne({ homologationRequest: requestId })
    const form11 = await form11Schema.findOne({ homologationRequest: requestId })
    const form13 = await form13Schema.findOne({ homologationRequest: requestId })
    
    if (form1A == null) {
      throw new Error(`form1A doesnt exist with id: ${requestId}`)
    }
    let updatedform1AData
    //console.log(`updating ${JSON.stringify(data)} data for form1A: ${form1A._id}`)
    if (data.Front_Tyre) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            // "Tyres.TyresData.$[tyres].Front_Tyre": data.Front_Tyre,

          


              "Tyres.TyresData.$[tyres].Front_Tyre.properties.Variant.value": data.Front_Tyre.properties.Variant.value,
              "Tyres.TyresData.$[tyres].Front_Tyre.properties.Type.value": data.Front_Tyre.properties.Type.value,
              "Tyres.TyresData.$[tyres].Front_Tyre.properties.Size.value": data.Front_Tyre.properties.Size.value,
              "Tyres.TyresData.$[tyres].Front_Tyre.properties.Make.value": data.Front_Tyre.properties.Make.value,
              "Tyres.TyresData.$[tyres].Front_Tyre.properties.TAC.value": data.Front_Tyre.properties.TAC.value,
              "Tyres.TyresData.$[tyres].Front_Tyre.properties.Dynamic_rolling.value": data.Front_Tyre.properties.Dynamic_rolling.value,
              // "Tyres.TyresData.$[tyres].Front_Tyre.properties.tyre_vehicle_type.value": data.Front_Tyre.properties.tyre_vehicle_type.value,
          

          },
        },
        { arrayFilters: [{ "tyres._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Rear_Tyre) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Tyres.TyresData.$[tyres].Rear_Tyre": data.Rear_Tyre,
          },
        },
        { arrayFilters: [{ "tyres._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Any_other_Tyre) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Tyres.TyresData.$[tyres].Any_other_Tyre": data.Any_other_Tyre,
          },
        },
        { arrayFilters: [{ "tyres._id": data._id }], returnDocument: "after" }
      )
    }

    if (data.Tyre_Description) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Tyres.TyresData.$[tyres].Tyre_Description": data.Tyre_Description,
          },
        },
        { arrayFilters: [{ "tyres._id": data._id }], returnDocument: "after" }
      )

      // if (form7 != null) {
        if (form7) {
        const item = form7.Tyres.TyresData.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
        if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
            {$set: {
                "Tyres.TyresData.$[item].Tyre_Description.properties.Laden.value": data.Tyre_Description.properties.Laden.value,
              },
            },{ arrayFilters: [{ "item._id": item._id }]})
        }
      }
    }
    if (data.Front_Wheel_Rim) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Wheel_Rim.WheelRim.$[wheelRim].Front_Wheel_Rim": data.Front_Wheel_Rim,
          },
        },
        { arrayFilters: [{ "wheelRim._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Wheel_Rim.WheelRim.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Wheel_Rim.WheelRim.$[item].Front_Wheel_Rim.properties.Make.value": data.Front_Wheel_Rim.properties.Make_of_front_wheel_Rim.value,
              "Wheel_Rim.WheelRim.$[item].Front_Wheel_Rim.properties.BIS_License_TAC_Number_with_its_Validity.value": data.Front_Wheel_Rim.properties.BIS_License_Number_validity.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Rear_Wheel_Rim) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Wheel_Rim.WheelRim.$[wheelRim].Rear_Wheel_Rim": data.Rear_Wheel_Rim,
          },
        },
        { arrayFilters: [{ "wheelRim._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Wheel_Rim.WheelRim.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Wheel_Rim.WheelRim.$[item].Rear_Wheel_Rim.properties.Make.value": data.Rear_Wheel_Rim.properties.Make_of_rear_wheel_Rim.value,
              "Wheel_Rim.WheelRim.$[item].Rear_Wheel_Rim.properties.BIS_License_TAC_Number_its_Validity.value": data.Rear_Wheel_Rim.properties.BIS_License_Number_validity.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Horn) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Horn.Horn.$[horn].Horn": data.Horn,
          },
        },
        { arrayFilters: [{ "horn._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Horn.Horn.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Horn.Horn.$[item].Horn.properties.Make.value": data.Horn.properties.Make_of_the_Horn.value,
              "Horn.Horn.$[item].Horn.properties.TAC_Number_Its_Validity.value": data.Horn.properties.TAC_Number_Validity.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Headline) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Ligthing_Signaling.LigthingSignaling.$[ligthingSignaling].Headline": data.Headline,
          },
        },
        { arrayFilters: [{ "ligthingSignaling._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Annexure_1) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Ligthing_Signaling.LigthingSignaling.$[ligthingSignaling].Annexure_1": data.Annexure_1,
          },
        },
        { arrayFilters: [{ "ligthingSignaling._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Annexure_2) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Ligthing_Signaling.LigthingSignaling.$[ligthingSignaling].Annexure_2": data.Annexure_2,
          },
        },
        { arrayFilters: [{ "ligthingSignaling._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Main_Beam_Head_Lamp) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Head_Lamp.HeadLamp.$[headLamp].Main_Beam_Head_Lamp": data.Main_Beam_Head_Lamp,
          },
        },
        { arrayFilters: [{ "headLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Head_Lamp.HeadLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Head_Lamp.HeadLamp.$[item].Main_Beam_Head_Lamp_LED_type.properties.Main_Beam_Head_Lamp_make.value": data.Main_Beam_Head_Lamp.properties.Main_Beam_Head_Lamp_make.value,
              "Head_Lamp.HeadLamp.$[item].Main_Beam_Head_Lamp_LED_type.properties.TAC_Number.value": data.Main_Beam_Head_Lamp.properties.TAC_Number.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Main_Beam_Headlamp_Filament_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Head_Lamp.HeadLamp.$[headLamp].Main_Beam_Headlamp_Filament_Type": data.Main_Beam_Headlamp_Filament_Type,
          },
        },
        { arrayFilters: [{ "headLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Head_Lamp.HeadLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Head_Lamp.HeadLamp.$[item].Main_Beam_Headlamp_Filament_Type.properties.Make.value": data.Main_Beam_Headlamp_Filament_Type.properties.Make_of_main_beam_bulb.value,
              "Head_Lamp.HeadLamp.$[item].Main_Beam_Headlamp_Filament_Type.properties.Category_of_bulb.value": data.Main_Beam_Headlamp_Filament_Type.properties.Category_bulb_per_AIS034.value,
              "Head_Lamp.HeadLamp.$[item].Main_Beam_Headlamp_Filament_Type.properties.TAC_Number.value": data.Main_Beam_Headlamp_Filament_Type.properties.TAC_Number_Main_beam_headlamp_bulb.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Dipped_Beam_Headlamp_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Head_Lamp.HeadLamp.$[headLamp].Dipped_Beam_Headlamp_LED_Type": data.Dipped_Beam_Headlamp_LED_Type,
          },
        },
        { arrayFilters: [{ "headLamp._id": data._id }], returnDocument: "after" }
      )
        // if (form8 != null) {
if (form8 ) {
          const item = form8.Head_Lamp.HeadLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
        if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
            {$set: {
                "Head_Lamp.HeadLamp.$[item].Dipped_Beam_Headlamp_LED_Type.properties.Make.value": data.Dipped_Beam_Headlamp_LED_Type.properties.Make_of_dipped_beam_head_lamp.value,
                "Head_Lamp.HeadLamp.$[item].Dipped_Beam_Headlamp_LED_Type.properties.TAC_Number.value": data.Dipped_Beam_Headlamp_LED_Type.properties.TAC_Number.value,
              },
            },{ arrayFilters: [{ "item._id": item._id }]})
        }
        }
    }
    if (data.Dipped_Beam_Headlamp_Filament_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Head_Lamp.HeadLamp.$[headLamp].Dipped_Beam_Headlamp_Filament_Type": data.Dipped_Beam_Headlamp_Filament_Type,
          },
        },
        { arrayFilters: [{ "headLamp._id": data._id }], returnDocument: "after" }
      )
      // if (form8 != null) {
if (form8 ) {
        const item = form8.Head_Lamp.HeadLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Head_Lamp.HeadLamp.$[item].Dipped_Beam_Headlamp_Filament_Type.properties.Make.value": data.Dipped_Beam_Headlamp_Filament_Type.properties.Make_of_dipped_beam_head_lamp.value,
              "Head_Lamp.HeadLamp.$[item].Dipped_Beam_Headlamp_Filament_Type.properties.Category_as_per_AIS_035.value": data.Dipped_Beam_Headlamp_Filament_Type.properties.Category_per_AIS034.value,
              "Head_Lamp.HeadLamp.$[item].Dipped_Beam_Headlamp_Filament_Type.properties.TAC_Number.value": data.Dipped_Beam_Headlamp_Filament_Type.properties.TAC_Number.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Front_Position_Lamp_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Front_Position_Lamp_LED_Type": data.Front_Position_Lamp_LED_Type,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Position_Lamps.PositionLamps.$[item].Front_Position_Lamp_LED_Type.properties.Make.value": data.Front_Position_Lamp_LED_Type.properties.Make_of_front_Position_lamp.value,
              "Position_Lamps.PositionLamps.$[item].Front_Position_Lamp_LED_Type.properties.TAC_Number.value": data.Front_Position_Lamp_LED_Type.properties.TAC_Number_of_Front_Position_Lamp.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Front_Position_Lamp_Bulb_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Front_Position_Lamp_Bulb_Type": data.Front_Position_Lamp_Bulb_Type,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Position_Lamps.PositionLamps.$[item].Front_Position_Lamp_Bulb_Type.properties.Make.value": data.Front_Position_Lamp_Bulb_Type.properties.Make_of_Front_Position_Lamp.value,
              "Position_Lamps.PositionLamps.$[item].Front_Position_Lamp_Bulb_Type.properties.Category_as_per_AIS_034.value": data.Front_Position_Lamp_Bulb_Type.properties.Category_as_per_AIS034.value,
              "Position_Lamps.PositionLamps.$[item].Front_Position_Lamp_Bulb_Type.properties.TAC_Number.value": data.Front_Position_Lamp_Bulb_Type.properties.TAC_Number_of_Front_Position_Lamp.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Front_Parking_Lamp_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Front_Parking_Lamp_LED_Type": data.Front_Parking_Lamp_LED_Type,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Front_Parking_Lamp_Bulb_type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Front_Parking_Lamp_Bulb_type": data.Front_Parking_Lamp_Bulb_type,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Parking_Lamp_Bulb_Rear) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Parking_Lamp_Bulb_Rear": data.Parking_Lamp_Bulb_Rear,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Position_Lamps.PositionLamps.$[item].Parking_Lamp_Bulb_Rear.properties.Make.value": data.Parking_Lamp_Bulb_Rear.properties.Make_of_Parking_lamp_bulb_rear.value,
              "Position_Lamps.PositionLamps.$[item].Parking_Lamp_Bulb_Rear.properties.Category_as_per_AIS_035.value": data.Parking_Lamp_Bulb_Rear.properties.Category_as_per_AIS035.value,
              "Position_Lamps.PositionLamps.$[item].Parking_Lamp_Bulb_Rear.properties.TAC_Number.value": data.Parking_Lamp_Bulb_Rear.properties.TAC_Number.value,

            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
//     if (data.Parking_Lamp_Led_Rear) {
//       updatedform1AData = await form1ASchema.findByIdAndUpdate(
//         form1A._id,
//         {
//           $set: {
//             "Position_Lamps.PositionLamps.$[positionLamps].Parking_Lamp_Led_Rear": data.Parking_Lamp_Led_Rear,
//           },
//         },
//         { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
//       )

//       // if (form8 != null) {
// if (form8 ) {
//         const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
//       if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
//           {$set: {
      
//               "Position_Lamps.PositionLamps.$[item].Parking_Lamp_Led_Rear.properties.Make_of_Parking_lamp_led_rear.value": data.Parking_Lamp_Led_Rear.properties.Make_of_Parking_lamp_led_rear.value,
//               "Position_Lamps.PositionLamps.$[item].Parking_Lamp_Led_Rear.properties.Category_as_per_AIS035.value": data.Parking_Lamp_Led_Rear.properties.Category_as_per_AIS035.value,
//               "Position_Lamps.PositionLamps.$[item].Parking_Lamp_Led_Rear.properties.TAC_Number.value": data.Parking_Lamp_Led_Rear.properties.TAC_Number.value,
//             },
//           },{ arrayFilters: [{ "item._id": item._id }]})
//       }
//       }
//     }
if (data.Rear_Position_Lamp_LED_Type) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Position_Lamps.PositionLamps.$[positionLamps].Rear_Position_Lamp_LED_Type": data.Rear_Position_Lamp_LED_Type,
      },
    },
    { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
// if (form8 ) {
//     const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
//   if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
//       {$set: {
//           "Position_Lamps.PositionLamps.$[item].Rear_Position_Lamp_LED_Type.properties.Make_of_front_Position_lamp.value": data.Rear_Position_Lamp_LED_Type.properties.Make_of_front_Position_lamp.value,
//           "Position_Lamps.PositionLamps.$[item].Rear_Position_Lamp_LED_Type.properties.Number_of_Rear_Position_lamps_and_Colour_of_light.value": data.Rear_Position_Lamp_LED_Type.properties.Number_of_Rear_Position_lamps_and_Colour_of_light.value,
//           "Position_Lamps.PositionLamps.$[item].Rear_Position_Lamp_LED_Type.properties.TAC_Number_of_Rear_Position_Lamp.value": data.Rear_Position_Lamp_LED_Type.properties.TAC_Number_of_Rear_Position_Lamp.value,

//         },
//       },{ arrayFilters: [{ "item._id": item._id }]})
//   }
//   }
}

if (data.Rear_Position_Lamp_Bulb_Type) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Position_Lamps.PositionLamps.$[positionLamps].Rear_Position_Lamp_Bulb_Type": data.Rear_Position_Lamp_Bulb_Type,
      },
    },
    { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
// if (form8 ) {
//     const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
//   if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
//       {$set: {
//           "Position_Lamps.PositionLamps.$[item].Rear_Position_Lamp_Bulb_Type.properties.Make_of_front_Position_lamp.value": data.Rear_Position_Lamp_Bulb_Type.properties.Make_of_front_Position_lamp.value,
//           "Position_Lamps.PositionLamps.$[item].Rear_Position_Lamp_Bulb_Type.properties.Category_as_per_AIS034.value": data.Rear_Position_Lamp_Bulb_Type.properties.Category_as_per_AIS034.value,
//           "Position_Lamps.PositionLamps.$[item].Rear_Position_Lamp_Bulb_Type.properties.TAC_Number_of_Rear_Position_Lamp.value": data.Rear_Position_Lamp_Bulb_Type.properties.TAC_Number_of_Rear_Position_Lamp.value,

//         },
//       },{ arrayFilters: [{ "item._id": item._id }]})
//   }
//   }
}
    if (data.Stop_Lamp_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Stop_Lamp_LED_Type": data.Stop_Lamp_LED_Type,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Position_Lamps.PositionLamps.$[item].Stop_Lamp_LED_Type.properties.Make.value": data.Stop_Lamp_LED_Type.properties.Make_of_Stop_lamp.value,
              "Position_Lamps.PositionLamps.$[item].Stop_Lamp_LED_Type.properties.TAC_Number.value": data.Stop_Lamp_LED_Type.properties.TAC_Number.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Stop_Lamp_bulb_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Position_Lamps.PositionLamps.$[positionLamps].Stop_Lamp_bulb_Type": data.Stop_Lamp_bulb_Type,
          },
        },
        { arrayFilters: [{ "positionLamps._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Position_Lamps.PositionLamps.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Position_Lamps.PositionLamps.$[item].Stop_lamp_bulb_Filament_Type.properties.Make.value": data.Stop_Lamp_bulb_Type.properties.Make_of_Stop_lamp_bulb.value,
              "Position_Lamps.PositionLamps.$[item].Stop_lamp_bulb_Filament_Type.properties.Category_as_per_AIS_035.value": data.Stop_Lamp_bulb_Type.properties.Category_as_per_AIS035.value,
              "Position_Lamps.PositionLamps.$[item].Stop_lamp_bulb_Filament_Type.properties.TAC_Number.value": data.Stop_Lamp_bulb_Type.properties.TAC_Number.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Registration_Plate_Lamp_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Rear_Registration_Plate.RearRegistrationPlate.$[rearRegistrationPlate].Registration_Plate_Lamp_LED_Type": data.Registration_Plate_Lamp_LED_Type,
          },
        },
        { arrayFilters: [{ "rearRegistrationPlate._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.$[item].Registration_Plate_Lamp_LED_Type.properties.Make.value": data.Registration_Plate_Lamp_LED_Type.properties.Make_Rear_Reg_Plate_Lamp.value,
              "Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.$[item].Registration_Plate_Lamp_LED_Type.properties.TAC_Number.value": data.Registration_Plate_Lamp_LED_Type.properties.TAC_Rear_Reg_Plate_Lamp.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }

    }
    if (data.Registration_Plate_Lamp_bulb_type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Rear_Registration_Plate.RearRegistrationPlate.$[rearRegistrationPlate].Registration_Plate_Lamp_bulb_type": data.Registration_Plate_Lamp_bulb_type,
          },
        },
        { arrayFilters: [{ "rearRegistrationPlate._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.$[item].Registration_Plate_Lamp_bulb_type.properties.Make.value": data.Registration_Plate_Lamp_bulb_type.properties.Make_Number_Plate_Lamp_Bulb.value,
              "Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.$[item].Registration_Plate_Lamp_bulb_type.properties.Category_as_per_AIS_035.value": data.Registration_Plate_Lamp_bulb_type.properties.Category_per_AIS_035.value,
              "Rear_Registration_Plate_lamp.RearRegistrationPlatelamp.$[item].Registration_Plate_Lamp_bulb_type.properties.TAC_Number.value": data.Registration_Plate_Lamp_bulb_type.properties.TAC_Number_Plate_Lamp_Bulb.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }

    }
    if (data.Front_Dir_Indicator_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[directionIndicatorLamp].Front_Dir_Indicator_LED_Type": data.Front_Dir_Indicator_LED_Type,
          },
        },
        { arrayFilters: [{ "directionIndicatorLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Direction_Indicator_Lamp.DirectionIndicatorLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Front_Direction_Indicator_LED_Type.properties.Make.value": data.Front_Dir_Indicator_LED_Type.properties.Make_Front_Direction_Indicator.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Front_Direction_Indicator_LED_Type.properties.TAC_Number.value": data.Front_Dir_Indicator_LED_Type.properties.TAC_Num_Front_Direction_Indicator.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Front_Dir_indicator_Bulb_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[directionIndicatorLamp].Front_Dir_indicator_Bulb_Type": data.Front_Dir_indicator_Bulb_Type,
          },
        },
        { arrayFilters: [{ "directionIndicatorLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Direction_Indicator_Lamp.DirectionIndicatorLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Front_Direction_indicator_Bulb_Type.properties.Make.value": data.Front_Dir_indicator_Bulb_Type.properties.Make_Front_Dir_Indicators.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Front_Direction_indicator_Bulb_Type.properties.Category_as_per_AIS_035.value": data.Front_Dir_indicator_Bulb_Type.properties.Category_per_AIS_035.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Front_Direction_indicator_Bulb_Type.properties.TAC_Number.value": data.Front_Dir_indicator_Bulb_Type.properties.TAC_Dir_Indicator.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }

    }
    if (data.Rear_Direction_Indicator_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[directionIndicatorLamp].Rear_Direction_Indicator_LED_Type": data.Rear_Direction_Indicator_LED_Type,
          },
        },
        { arrayFilters: [{ "directionIndicatorLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Direction_Indicator_Lamp.DirectionIndicatorLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Rear_Direction_Indicator_LED_Type.properties.Make.value": data.Rear_Direction_Indicator_LED_Type.properties.Make_Front_Direction_Indicator.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Rear_Direction_Indicator_LED_Type.properties.TAC_Front_Direction_Indicator.value": data.Rear_Direction_Indicator_LED_Type.properties.TAC_Front_Direction_Indicator.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Rear_Direction_Indicator_Bulb_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[directionIndicatorLamp].Rear_Direction_Indicator_Bulb_Type": data.Rear_Direction_Indicator_Bulb_Type,
          },
        },
        { arrayFilters: [{ "directionIndicatorLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Direction_Indicator_Lamp.DirectionIndicatorLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Rear_Direction_Indicator_Bulb_Type.properties.Make.value": data.Rear_Direction_Indicator_Bulb_Type.properties.Make.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Rear_Direction_Indicator_Bulb_Type.properties.Category_as_per_AIS_035.value": data.Rear_Direction_Indicator_Bulb_Type.properties.Category_per_AIS_035.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Rear_Direction_Indicator_Bulb_Type.properties.TAC_Number.value": data.Rear_Direction_Indicator_Bulb_Type.properties.TAC_BIS_License_E_Marking_no.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Side_Direction_Indicator) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[directionIndicatorLamp].Side_Direction_Indicator": data.Side_Direction_Indicator,
          },
        },
        { arrayFilters: [{ "directionIndicatorLamp._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Direction_Indicator_Lamp.DirectionIndicatorLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Side_Direction_Indicator.properties.Make.value": data.Side_Direction_Indicator.properties.Make_Side_Direction_Indicator.value,
              "Direction_Indicator_Lamp.DirectionIndicatorLamp.$[item].Side_Direction_Indicator.properties.TAC_Number.value": data.Side_Direction_Indicator.properties.TAC_Num_Side_Direc_Indiacator.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
      }
    }
    if (data.Hazard_Warn_lamp_Front_Led) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Hazard_Warning_Lamp.HazardWarningLamp.$[hazardWarningLamp].Hazard_Warn_lamp_Front_Led": data.Hazard_Warn_lamp_Front_Led,
          },
        },
        { arrayFilters: [{ "hazardWarningLamp._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Front_Dir_indicator_Bulb_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Hazard_Warning_Lamp.HazardWarningLamp.$[hazardWarningLamp].Front_Dir_indicator_Bulb_Type": data.Front_Dir_indicator_Bulb_Type,
          },
        },
        { arrayFilters: [{ "hazardWarningLamp._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Hazard_warning_Lamp_LED_Type) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Hazard_Warning_Lamp.HazardWarningLamp.$[hazardWarningLamp].Hazard_warning_Lamp_LED_Type": data.Hazard_warning_Lamp_LED_Type,
          },
        },
        { arrayFilters: [{ "hazardWarningLamp._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Rear_Hazard_Lamp) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Hazard_Warning_Lamp.HazardWarningLamp.$[hazardWarningLamp].Rear_Hazard_Lamp": data.Rear_Hazard_Lamp,
          },
        },
        { arrayFilters: [{ "hazardWarningLamp._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Side_Hazard_Lamp) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Hazard_Warning_Lamp.HazardWarningLamp.$[hazardWarningLamp].Side_Hazard_Lamp": data.Side_Hazard_Lamp,
          },
        },
        { arrayFilters: [{ "hazardWarningLamp._id": data._id }], returnDocument: "after" }
      )
    }
    if (data.Daytime_Running_Lamp) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
          {
            $set: {
              "Daytime_Running_Lamp.DaytimeRunningLamp.$[daytimeRunningLamp].Daytime_Running_Lamp": data.Daytime_Running_Lamp,
            },
          },
          { arrayFilters: [{ "daytimeRunningLamp._id": data._id }], returnDocument: "after" }
        )
      }
      if (data.Daytime_Running_Lamp_Led) {
        updatedform1AData = await form1ASchema.findByIdAndUpdate(
          form1A._id,
            {
              $set: {
                "Daytime_Running_Lamp.DaytimeRunningLamp.$[daytimeRunningLamp].Daytime_Running_Lamp_Led": data.Daytime_Running_Lamp_Led,
              },
            },
            { arrayFilters: [{ "daytimeRunningLamp._id": data._id }], returnDocument: "after" }
          )
        }
    if (data.Hydraulic_Brake_Hose) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Hydraulic_Brake_Hose.HydraulicBrakeHose.$[hydraulicBrakeHose].Hydraulic_Brake_Hose": data.Hydraulic_Brake_Hose,
          },
        },
        { arrayFilters: [{ "hydraulicBrakeHose._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Hydraulic_Brake_Hose.HydraulicBrakeHose.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
        if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
            {$set: {
                "Hydraulic_Brake_Hose.HydraulicBrakeHose.$[item].Hydraulic_Brake_Hose.properties.Make.value": data.Hydraulic_Brake_Hose.properties.Make_Brake_Hose.value,
                "Hydraulic_Brake_Hose.HydraulicBrakeHose.$[item].Hydraulic_Brake_Hose.properties.TAC_Number.value": data.Hydraulic_Brake_Hose.properties.TAC_Num_Brake_Hose.value,
              },
            },{ arrayFilters: [{ "item._id": item._id }]})
        }
      }
    }
    if (data.Hydraulic_Brake_Fluid) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Brake_Fluid.BrakeFluid.$[brakeFluid].Hydraulic_Brake_Fluid": data.Hydraulic_Brake_Fluid,
          },
        },
        { arrayFilters: [{ "brakeFluid._id": data._id }], returnDocument: "after" }
      )

      // if (form8 != null) {
if (form8 ) {
        const item = form8.Brake_Fluid.BrakeFluid.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
        if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
            {$set: {
                "Brake_Fluid.BrakeFluid.$[item].Hydraulic_Brake_Fluid.properties.Make.value": data.Hydraulic_Brake_Fluid.properties.Make_of_Brake_Fluid.value,
              },
            },{ arrayFilters: [{ "item._id": item._id }]})
        }
      }
    }  

    
    if (data.Vehicle_Control) {
      updatedform1AData = await form1ASchema.findByIdAndUpdate(
        form1A._id,
        {
          $set: {
            "Vehicle_Control_Unit.VehicleControlUnit.$[vehicleControlUnit].Vehicle_Control": data.Vehicle_Control,
          },
        },
        { arrayFilters: [{ "vehicleControlUnit._id": data._id }], returnDocument: "after" }
      )
    }


 if (data.Rear_View_Mirror) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Rear_View_Mirror.RearViewMirror.$[rearViewMirror].Rear_View_Mirror": data.Rear_View_Mirror,
      },
    },
    { arrayFilters: [{ "rearViewMirror._id": data._id }], returnDocument: "after" }
  )
  // if (form8 != null) {
if (form8 ) {
    const item = form8.Rear_View_Mirror.RearViewMirror.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
        {$set: {
            "Rear_View_Mirror.RearViewMirror.$[item].Rear_View_Mirror.properties.Make.value": data.Rear_View_Mirror.properties.Make_Rear_View_Mirrors.value,
            "Rear_View_Mirror.RearViewMirror.$[item].Rear_View_Mirror.properties.TAC_Number_Its_Validity.value": data.Rear_View_Mirror.properties.TAC_Number_Validity.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Reversing_Lamp) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Reversing_Lamp.ReversingLamp.$[reversingLamp].Reversing_Lamp": data.Reversing_Lamp,
      },
    },
    { arrayFilters: [{ "reversingLamp._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Reversing_Lamp.ReversingLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
        {$set: {
            "Reversing_Lamp.ReversingLamp.$[item].Reversing_Lamp.properties.Make.value": data.Reversing_Lamp.properties.Make_Reverse_Lamp.value,
            "Reversing_Lamp.ReversingLamp.$[item].Reversing_Lamp.properties.TAC_Number.value": data.Reversing_Lamp.properties.TAC_Num_Reverse_lamp.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Reverse_Lamp_Bulb_Type) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Reversing_Lamp.ReversingLamp.$[reversingLamp].Reverse_Lamp_Bulb_Type": data.Reverse_Lamp_Bulb_Type,
      },
    },
    { arrayFilters: [{ "reversingLamp._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
  const item = form8.Reversing_Lamp.ReversingLamp.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
        {$set: {
            "Reversing_Lamp.ReversingLamp.$[item].Reverse_Lamp_Bulb_Type.properties.Make.value": data.Reverse_Lamp_Bulb_Type.properties.Make_Reverse_Lamp.value,
            "Reversing_Lamp.ReversingLamp.$[item].Reverse_Lamp_Bulb_Type.properties.Category_as_per_AIS_035.value": data.Reverse_Lamp_Bulb_Type.properties.Category_per_AIS_035.value,
            "Reversing_Lamp.ReversingLamp.$[item].Reverse_Lamp_Bulb_Type.properties.TAC_Number.value": data.Reverse_Lamp_Bulb_Type.properties.TAC_Number_Reverse_Lamp.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Manufacturer_Details) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Vehicle_General_Information.VehicleGeneralInformation.$[vehicleGeneralInformation].Manufacturer_Details": data.Manufacturer_Details,
      },
    },
    { arrayFilters: [{ "vehicleGeneralInformation._id": data._id }], returnDocument: "after" }
  )

  // if (form7 != null) {
    if (form7 ) {
    const item = form7.Vehicle_General_Information.VehicleGeneralInformation.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
  if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
      {$set: {
          "Vehicle_General_Information.VehicleGeneralInformation.$[item].Manufacturer_Details.properties.Vehicle_category.value": data.Manufacturer_Details.properties.Vehicle_category.value,
          "Vehicle_General_Information.VehicleGeneralInformation.$[item].Manufacturer_Details.properties.Name_and_address_of_the_vehicle_importer.value": data.Manufacturer_Details.properties.Name_and_address_of_the_vehicle_importer.value,
          "Vehicle_General_Information.VehicleGeneralInformation.$[item].Manufacturer_Details.properties.variant.value": data.Manufacturer_Details.properties.variant.value,
        },
      },{ arrayFilters: [{ "item._id": item._id }]})
  }
  }

  if (form13) {
    const item = form13.Vehicle_General_Information.vehicleGeneralInformation.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    //console.log("Form13 item found:", item);

    if(item != null) {await form13Schema.findByIdAndUpdate(form13._id,
      {$set: {
          "Vehicle_General_Information.vehicleGeneralInformation.$[item].Manufacturer_Details.properties.Vehicle_category.value": data.Manufacturer_Details.properties.Vehicle_category.value,         
        },
      },{ arrayFilters: [{ "item._id": item._id }]})
  }
  }
  if (form11 ) {
    const item = form11.Vehicle_General_Information.vehicleGeneralInformation.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
  if(item != null) {await form11Schema.findByIdAndUpdate(form11._id,
      {$set: {
          "Vehicle_General_Information.vehicleGeneralInformation.$[item].Manufacturer_Details.properties.Vehicle_category.value": data.Manufacturer_Details.properties.Vehicle_category.value,        
        },
      },{ arrayFilters: [{ "item._id": item._id }]})
  }
  }

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Handle_Lock.HandleLock.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
  if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
      {$set: {
          "Handle_Lock.HandleLock.$[item].Protective_Device_Handle_Lock.properties.Vehicle_category.value": data.Manufacturer_Details.properties.Vehicle_category.value,        
        },
      },{ arrayFilters: [{ "item._id": item._id }]})
  }
  }
}

if (data.General_arrangement_vehicle) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "General_arrangement_vehicle.GeneralArrangementVehicle.$[generalArrangementVehicle].General_arrangement_vehicle": data.General_arrangement_vehicle,
      },
    },
    { arrayFilters: [{ "generalArrangementVehicle._id": data._id }], returnDocument: "after" }
  )
  // if (form7 != null) {
    if (form7) {
    const item = form7.General_arrangement_of_the_vehicle.Generalarrangementofthevehicle.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "General_arrangement_of_the_vehicle.Generalarrangementofthevehicle.$[item].General_arrangement_of_the_vehicle.properties.Number_of_seating_positions.value": data.General_arrangement_vehicle.properties.Number_of_seating_positions.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
  // if (form7 != null) {
  //   if (form7) {
  //   const item = form7.Vehicle_Dimensions.VehicleDimensions.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
  //   if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
  //       {$set: {
  //           "Vehicle_Dimensions.VehicleDimensions.$[item].General_arrangement_of_the_vehicle_dimension.properties.Wheel_base.value": data.General_arrangement_vehicle.properties.Wheel_base.value,
  //         },
  //       },{ arrayFilters: [{ "item._id": item._id }]})
  //   }
  // }
}

if (data.Kerb_Weight) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Weights.WeightsData.$[weightsData].Kerb_Weight": data.Kerb_Weight,
      },
    },
    { arrayFilters: [{ "weightsData._id": data._id }], returnDocument: "after" }
  )
  if (form7 != null) {
    const item = form7.Weights.Weights.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Weights.Weights.$[item].Kerb_Weight.properties.Vehicle_kerb_weight.value": data.Kerb_Weight.properties.Vehicle_kerb_weight.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Gross_Vehicle_Weight) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Weights.WeightsData.$[weightsData].Gross_Vehicle_Weight": data.Gross_Vehicle_Weight,
      },
    },
    { arrayFilters: [{ "weightsData._id": data._id }], returnDocument: "after" }
  )
  if (form7 != null) {
    const item = form7.Weights.Weights.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Weights.Weights.$[item].Gross_Vehicle_Weight.properties.Gross_Vehicle_Weight.value": data.Gross_Vehicle_Weight.properties.Gross_Vehicle_Weight.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Maximum_Carrying_capacity) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Weights.WeightsData.$[weightsData].Maximum_Carrying_capacity": data.Maximum_Carrying_capacity,
      },
    },
    { arrayFilters: [{ "weightsData._id": data._id }], returnDocument: "after" }
  )
  // if (form7 != null) {
    if (form7) {
    const item = form7.Weights.Weights.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Weights.Weights.$[item].Maximum_Carrying_capacity.properties.Max_GCW_kg.value": data.Maximum_Carrying_capacity.properties.Max_GCW_kg.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Suspension) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Suspension.SuspensionData.$[suspensionData].Suspension": data.Suspension,
      },
    },
    { arrayFilters: [{ "suspensionData._id": data._id }], returnDocument: "after" }
  )
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "SteeringSuspensionAntiTheft.SteeringSuspensionAntiTheftData.$[suspensionData].Suspension": data.Suspension,
      },
    },
    { arrayFilters: [{ "suspensionData._id": data._id }], returnDocument: "after" }
  )
  if (form7 != null) {
    const item = form7.Suspension.Suspension.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Suspension.Suspension.$[item].Suspension.properties.Type_of_springs_provided_at_front_and_Rear.value": data.Suspension.properties.springs_at_front_and_Rear.value,
            "Suspension.Suspension.$[item].Suspension.properties.Antiroll_bar_if_provided.value": data.Suspension.properties.Anti_roll_bar.value,
            "Suspension.Suspension.$[item].Suspension.properties.Type_of_Shock_absorbers_provided_at_the_front_and_Rear.value": data.Suspension.properties.Shock_absorbers_at_front_rear.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }

  if (form7 != null) {
    const item = form7.SteeringSuspension.SteeringSuspensionData.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "SteeringSuspension.SteeringSuspensionData.$[item].Suspension.properties.Type_of_springs_provided_at_front_and_Rear.value": data.Suspension.properties.springs_at_front_and_Rear.value,
            "SteeringSuspension.SteeringSuspensionData.$[item].Suspension.properties.Antiroll_bar_if_provided.value": data.Suspension.properties.Anti_roll_bar.value,
            "SteeringSuspension.SteeringSuspensionData.$[item].Suspension.properties.Type_of_Shock_absorbers_provided_at_the_front_and_Rear.value": data.Suspension.properties.Shock_absorbers_at_front_rear.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Brief_Brake_Information) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Brief_Brake_Information": data.Brief_Brake_Information,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
  // if (form7 != null) {
    if (form7) {
    const item = form7.Brakes.Brakes.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Brakes.Brakes.$[item].Brief_Brake_Information.properties.Select_Type_of_Braking_System.value": data.Brief_Brake_Information.properties.Type_of_Braking_System.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Parts_of_Brake_System) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Parts_of_Brake_System": data.Parts_of_Brake_System,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
  if (form7 != null) {
    const item = form7.Brakes.Brakes.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Brakes.Brakes.$[item].Parts_of_Brake_System.properties.Front_and_rear_braking_area.value": data.Parts_of_Brake_System.properties.Front_rear_braking.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.ABS) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].ABS": data.ABS,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
  // if (form7 != null) {
    if (form7 ) {
    const item = form7.Brakes.Brakes.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Brakes.Brakes.$[item].ABS.properties.Whether_ABS_provided.value": data.ABS.properties.ABS_provided.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
// if (data.Drawing) {
//   updatedform1AData = await form1ASchema.findByIdAndUpdate(
//     form1A._id,
//     {
//       $set: {
//         "Brakes.BrakesData.$[brakesData].Drawing": data.Drawing,
//       },
//     },
//     { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
//   )
// }
if (data.ECU) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].ECU": data.ECU,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
}
if (data.BrakeTypes) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].BrakeTypes": data.BrakeTypes,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
  if (form7 != null) {
    const item = form7.Brakes.Brakes.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "Brakes.Brakes.$[item].Brake_Types.properties.type_of_friction_front_wheel_brakes.value": data.BrakeTypes.properties.friction_front_wheel_brakes.value,
            "Brakes.Brakes.$[item].Brake_Types.properties.type_of_friction_Rear_wheel_brakes.value": data.BrakeTypes.properties.friction_rear_wheel_brakes.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Service_Brake_Controls) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Service_Brake_Controls": data.Service_Brake_Controls,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Free_Play_Ratio) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Free_Play_Ratio": data.Free_Play_Ratio,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Wheel_Cylinders) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Wheel_Cylinders": data.Wheel_Cylinders,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
} 
if (data.Parking_Brake) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Parking_Brake": data.Parking_Brake,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Re_Generative_Brake) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Brakes.BrakesData.$[brakesData].Re_Generative_Brake": data.Re_Generative_Brake,
      },
    },
    { arrayFilters: [{ "brakesData._id": data._id }], returnDocument: "after" }
  )
}

if (data.Grab_handle_Straps) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Two_Wheeler_Aggregates.TwoWheelerAggregatesData.$[element].Grab_handle_Straps": data.Grab_handle_Straps,
      },
    },
    { arrayFilters: [{ "element._id": data._id }], returnDocument: "after" }
  )
}

if (data.Two_Wheeler_Foot_Rest) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Two_Wheeler_Aggregates.TwoWheelerAggregatesData.$[element].Two_Wheeler_Foot_Rest": data.Two_Wheeler_Foot_Rest,
      },
    },
    { arrayFilters: [{ "element._id": data._id }], returnDocument: "after" }
  )
}

if (data.Spray_Suppression_Rear_Mud_Gaurd) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Two_Wheeler_Aggregates.TwoWheelerAggregatesData.$[element].Spray_Suppression_Rear_Mud_Gaurd": data.Spray_Suppression_Rear_Mud_Gaurd,
      },
    },
    { arrayFilters: [{ "element._id": data._id }], returnDocument: "after" }
  )
}

if (data.Two_Wheeler_Stand) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Two_Wheeler_Aggregates.TwoWheelerAggregatesData.$[element].Two_Wheeler_Stand": data.Two_Wheeler_Stand,
      },
    },
    { arrayFilters: [{ "element._id": data._id }], returnDocument: "after" }
  )
}

if (data.Vehicle_Controls) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Vehicle_Controls_and_Their_Location.VehicleControlsLocation.$[vehicleControlsLocation].Vehicle_Controls": data.Vehicle_Controls,
      },
    },
    { arrayFilters: [{ "vehicleControlsLocation._id": data._id }], returnDocument: "after" }
  )
}
if (data.Steering_System) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "SteeringSuspensionAntiTheft.SteeringSuspensionAntiTheftData.$[steeringData].Steering_System": data.Steering_System,
      },
    },
    { arrayFilters: [{ "steeringData._id": data._id }], returnDocument: "after" }
  )
  if (form7 != null) {
    const item = form7.SteeringSuspension.SteeringSuspensionData.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
            "SteeringSuspension.SteeringSuspensionData.$[item].Steering_System.properties.Select_Type_Steering_control_provided.value": data.Steering_System.properties.Steering_control_provided.value,
            "SteeringSuspension.SteeringSuspensionData.$[item].Steering_System.properties.Specify_steering_gear_ratio.value": data.Steering_System.properties.steering_gear_ratio.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}

if (data.Tell_Tales) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Tell_Tales.TellTales.$[tellTales].Tell_Tales": data.Tell_Tales,
      },
    },
    { arrayFilters: [{ "tellTales._id": data._id }], returnDocument: "after" }
  )
}
if (data.Indicators) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Indicators.IndicatorsData.$[indicatorsData].Indicators": data.Indicators,
      },
    },
    { arrayFilters: [{ "indicatorsData._id": data._id }], returnDocument: "after" }
  )
}
if (data.VINNumbering) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Vehicle_Identification_Number.VehicleIdentificationNumber.$[vehicleIdentificationNumber].VINNumbering": data.VINNumbering,
      },
    },
    { arrayFilters: [{ "vehicleIdentificationNumber._id": data._id }], returnDocument: "after" }
  )
  if (form11 != null) {
    const item = form11.Vehicle_Identification_Number.VehicleIdentificationNumber.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form11Schema.findByIdAndUpdate(form11._id,
        {$set: {
            "Vehicle_Identification_Number.VehicleIdentificationNumber.$[item].VIN_Numbering.properties.Specify_the_Location_of_VIN_on_Chassis.value": data.VINNumbering.properties.Location_VIN_on_Chassis.value,
            "Vehicle_Identification_Number.VehicleIdentificationNumber.$[item].VIN_Numbering.properties.Height_of_VIN_characters.value": data.VINNumbering.properties.Height_VIN_characters.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Lock_Anti_theft_device) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Handle_Lock_Anti_Theft_Device.HandleLock.$[handleLock].Lock_Anti_theft_device": data.Lock_Anti_theft_device,
      },
    },
    { arrayFilters: [{ "handleLock._id": data._id }], returnDocument: "after" }
  )
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "SteeringSuspensionAntiTheft.SteeringSuspensionAntiTheftData.$[handleLock].Lock_Anti_theft_device": data.Lock_Anti_theft_device,
      },
    },
    { arrayFilters: [{ "handleLock._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Handle_Lock.HandleLock.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
        {$set: {
            "Handle_Lock.HandleLock.$[item].Protective_Device_Handle_Lock.properties.Make.value": data.Lock_Anti_theft_device.properties.Make_of_Anti_Theft_Device.value
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Grab_handle_Straps) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Grab_handle.GrabHandle.$[grabHandle].Grab_handle_Straps": data.Grab_handle_Straps,
      },
    },
    { arrayFilters: [{ "grabHandle._id": data._id }], returnDocument: "after" }
  )
  // if (form8 != null) {
if (form8 ) {
    const item = form8.Grab_handle.Grabhandle.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
        {$set: {
            "Grab_handle.Grabhandle.$[item].Grab_handle_Straps.properties.Make.value": data.Grab_handle_Straps.properties.Make.value
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.External_Projection_Details) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Two_Wheeler_External_Projection.TwoWheelerExternalProjection.$[twoWheelerExternalProjection].External_Projection_Details": data.External_Projection_Details,
      },
    },
    { arrayFilters: [{ "twoWheelerExternalProjection._id": data._id }], returnDocument: "after" }
  )
}
// if (data.Transmission) {
//   updatedform1AData = await form1ASchema.findByIdAndUpdate(
//     form1A._id,
//     {
//       $set: {
//         "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Transmission": data.Transmission,
//       },
//     },
//     { arrayFilters: [{ "driveTrainSystemData._id": data._id }], returnDocument: "after" }
//   )
// }

if (data.Transmission) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Transmission": data.Transmission,
      },
    },
    { arrayFilters: [{ "driveTrainSystemData._id": data._id }], returnDocument: "after" }
  )
  if (form7 ) {
    const item = form7.Drive_Train_System.DriveTrainSystemData.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.First_gear_ratio.value": data.Transmission.properties.First_gear_ratio.value,
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Second_gear_ratio.value": data.Transmission.properties.Second_gear_ratio.value,
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Third_gear_ratio.value": data.Transmission.properties.Third_gear_ratio.value,
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Fourth_gear_ratio.value": data.Transmission.properties.Fourth_gear_ratio.value,
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Fifth_gear_ratio.value": data.Transmission.properties.Fifth_gear_ratio.value,
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Sixth_gear_ratio.value": data.Transmission.properties.Sixth_gear_ratio.value,          
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Type_Gear_box_vehicle.value": data.Transmission.properties.Type_Gear_box_vehicle.value,
          "Drive_Train_System.DriveTrainSystemData.$[item].Transmission.properties.Reverse_gear_max_speed.value": data.Transmission.properties.Reverse_gear_max_speed.value,      

         
        },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Clutch) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Drive_Train_System.DriveTrainSystemData.$[driveTrainSystemData].Clutch": data.Clutch,
      },
    },
    { arrayFilters: [{ "driveTrainSystemData._id": data._id }], returnDocument: "after" }
  )

  if (form7 ) {
    const item = form7.Drive_Train_System.DriveTrainSystemData.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form7Schema.findByIdAndUpdate(form7._id,
        {$set: {
          "Drive_Train_System.DriveTrainSystemData.$[item].Clutch.properties.Type.value": data.Clutch.properties.Type.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}

if (data.Fire_Fighting_System) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "FireFightingSystem.FireFightingSystemData.$[fireFightingSystemData].Fire_Fighting_System": data.Fire_Fighting_System,
      },
    },
    { arrayFilters: [{ "fireFightingSystemData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Vehicle_Performance) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "VehiclePerformance.VehiclePerformanceData.$[vehiclePerformanceData].Vehicle_Performance.properties.Any_Other_Feature_Manf_Desire": data.Vehicle_Performance.properties.Any_Other_Feature_Manf_Desire,
        "VehiclePerformance.VehiclePerformanceData.$[vehiclePerformanceData].Vehicle_Performance.properties.Max_hill_star_ability": data.Vehicle_Performance.properties.Max_hill_star_ability,
      },
    },
    { arrayFilters: [{ "vehiclePerformanceData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Dimension) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Dimension.DimensionData.$[dimensionData].Dimension": data.Dimension,
      },
    },
    { arrayFilters: [{ "dimensionData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Payload) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Payload.PayloadData.$[payloadData].Payload": data.Payload,
      },
    },
    { arrayFilters: [{ "payloadData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Other_Glazing) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Other_Glazing": data.Other_Glazing,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}
if (data.Windscreen_and_Wiping_System) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Windscreen_and_Wiping_System": data.Windscreen_and_Wiping_System,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Wind_screen.Windscreen.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
        {$set: {
            "Wind_screen.Windscreen.$[item].Windscreen.properties.Make.value": data.Windscreen_and_Wiping_System.properties.Make_of_windscreen.value,
            "Wind_screen.Windscreen.$[item].Windscreen.properties.BIS_License_Number_Validity.value": data.Windscreen_and_Wiping_System.properties.BIS_License_Number_of_Windscreen.value
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}



if (data.Wiper_Motor) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Wiper_Motor": data.Wiper_Motor,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}

if (data.Windscreen_wiper) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Windscreen_wiper": data.Windscreen_wiper,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}
if (data.Wiper_arm) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Wiper_arm": data.Wiper_arm,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}
if (data.Wiper_Blade) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Wiper_Blade": data.Wiper_Blade,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}
if (data.Washer_Tank) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Washer_Tank": data.Washer_Tank,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}
if (data.Washer_tank_motor_or_Washer_Pump_if_provided) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Windscreen_and_Wiping_System.WindscreenAndWipingSystem.$[windscreenAndWipingSystem].Washer_tank_motor_or_Washer_Pump_if_provided": data.Washer_tank_motor_or_Washer_Pump_if_provided,
      },
    },
    { arrayFilters: [{ "windscreenAndWipingSystem._id": data._id }], returnDocument: "after" }
  )
}
if (data.Seating_Arrangement) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Seating_Arrangement.SeatingArrangementData.$[seatingArrangementData].Seating_Arrangement": data.Seating_Arrangement,
      },
    },
    { arrayFilters: [{ "seatingArrangementData._id": data._id }], returnDocument: "after" }
  )
}
// if (data.R_Point) {
//   updatedform1AData = await form1ASchema.findByIdAndUpdate(
//     form1A._id,
//     {
//       $set: {
//         "RPoint.RPointData.$[rPointData].R_Point": data.R_Point,
//       },
//     },
//     { arrayFilters: [{ "rPointData._id": data._id }], returnDocument: "after" }
//   )
// }
if (data.SeatingDimension) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "SeatingDimension.SeatingDimensionData.$[seatingDimensionData].SeatingDimension": data.SeatingDimension,
      },
    },
    { arrayFilters: [{ "seatingDimensionData._id": data._id }], returnDocument: "after" }
  )
}
if (data.R_Point) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "SeatingDimension.SeatingDimensionData.$[seatingDimensionData].R_Point": data.R_Point,
      },
    },
    { arrayFilters: [{ "seatingDimensionData._id": data._id }], returnDocument: "after" }
  )
}
if (data.HPoint) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "H_Point.HPointData.$[hPointData].HPoint": data.HPoint,
      },
    },
    { arrayFilters: [{ "hPointData._id": data._id }], returnDocument: "after" }
  )
}
if (data.Rear_Entry_Provision) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Rear_Entry_Provision.RearEntryProvision.$[rearEntryProvision].Rear_Entry_Provision": data.Rear_Entry_Provision,
      },
    },
    { arrayFilters: [{ "rearEntryProvision._id": data._id }], returnDocument: "after" }
  )
}
if (data.Instrument_Cluster) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Instrument_Cluster.InstrumentCluster.$[instrumentCluster].Instrument_Cluster": data.Instrument_Cluster,
      },
    },
    { arrayFilters: [{ "instrumentCluster._id": data._id }], returnDocument: "after" }
  )
  if (form13 != null) {
    const item = form13.Instrument_Cluster.InstrumentCluster.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
    if(item != null) {await form13Schema.findByIdAndUpdate(form13._id,
        {$set: {
            "Instrument_Cluster.InstrumentCluster.$[item].Instrument_Cluster.properties.Make_of_the_Instrument_Cluster.value": data.Instrument_Cluster.properties.Make_of_the_Instrument_Cluster.value,
          },
        },{ arrayFilters: [{ "item._id": item._id }]})
    }
  }
}
if (data.Critical_Electrical_Devices) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Critical_Electrical_Devices.CriticalElectricalDevices.$[criticalElectricalDevices].Critical_Electrical_Devices":
          data.Critical_Electrical_Devices,
      },
    },
    { arrayFilters: [{ "criticalElectricalDevices._id": data._id }], returnDocument: "after" }
  )
}

if (data.Front_White_Reflector) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Retro_Reflectors.RetroReflectors.$[retroReflectors].Front_White_Reflector":
          data.Front_White_Reflector,
      },
    },
    { arrayFilters: [{ "retroReflectors._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Retro_Reflectors.RetroReflectors.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Retro_Reflectors.RetroReflectors.$[item].Front_White_Reflector.properties.Make.value": data.Front_White_Reflector.properties.Make_Front_Reflector.value,
              "Retro_Reflectors.RetroReflectors.$[item].Front_White_Reflector.properties.TAC_Number.value": data.Front_White_Reflector.properties.TAC_Num_Front_Reflector.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
    }
}

if (data.Rear_Red_Reflector) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Retro_Reflectors.RetroReflectors.$[retroReflectors].Rear_Red_Reflector":
          data.Rear_Red_Reflector,
      },
    },
    { arrayFilters: [{ "retroReflectors._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Retro_Reflectors.RetroReflectors.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Retro_Reflectors.RetroReflectors.$[item].Rear_Red_Reflector.properties.Make.value": data.Rear_Red_Reflector.properties.Make_Rear_Red_Reflector.value,
              "Retro_Reflectors.RetroReflectors.$[item].Rear_Red_Reflector.properties.TAC_Number.value": data.Rear_Red_Reflector.properties.TAC_Num_Rear_Reflector.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
    }
}

if (data.Side_Amber_Reflector) {
  updatedform1AData = await form1ASchema.findByIdAndUpdate(
    form1A._id,
    {
      $set: {
        "Retro_Reflectors.RetroReflectors.$[retroReflectors].Side_Amber_Reflector":
          data.Side_Amber_Reflector,
      },
    },
    { arrayFilters: [{ "retroReflectors._id": data._id }], returnDocument: "after" }
  )

  // if (form8 != null) {
if (form8 ) {
    const item = form8.Retro_Reflectors.RetroReflectors.find(arrItem => arrItem.supplier && arrItem.supplier.toString() === data.supplier._id);
      if(item != null) {await form8Schema.findByIdAndUpdate(form8._id,
          {$set: {
              "Retro_Reflectors.RetroReflectors.$[item].Side_Amber_Reflector.properties.Make.value": data.Side_Amber_Reflector.properties.Make_side_amber_reflector.value,
              "Retro_Reflectors.RetroReflectors.$[item].Side_Amber_Reflector.properties.TAC_Number.value": data.Side_Amber_Reflector.properties.TAC_Num_Side_Reflector.value,
            },
          },{ arrayFilters: [{ "item._id": item._id }]})
      }
    }
  }
  
  if (data.Reflective_Tape) {
    updatedform1AData = await form1ASchema.findByIdAndUpdate(
      form1A._id,
      {
        $set: {
          "Retro_Reflectors.RetroReflectors.$[retroReflectors].Reflective_Tape": data.Reflective_Tape,
        },
      },
      { arrayFilters: [{ "retroReflectors._id": data._id }], returnDocument: "after" }
    )
  }

  return updatedform1AData
  } catch (error) {
    //console.log(`Exception occured: ${error}`)
    return error
  }
}

const findOrCreateForm1A = async (requestId) => {
  //console.log(`inside findOrCreateForm1A`)
  let form1A = await form1ASchema.findOne({ homologationRequest: requestId })
    if (form1A == null) {
      //console.log(`creatng new form1A collection for requestId: ${requestId}`)
      form1A = await form1ASchema.create({
        homologationRequest: requestId,
      })
      const defaultSupplier = await getSupplierByKey();
      if(defaultSupplier){
        const requestData = await homologationRequestSchema.findById(requestId)
        //console.log(`adding defaultSupplier for VehicleGeneralInformation of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleGeneralInformation(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for GeneralArrangementVehicle of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await GeneralArrangementVehicle(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for Weights of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Weights(defaultSupplier._id, form1A)

        //console.log(`adding defaultSupplier for Brakes of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Brakes(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for VehicleControlsLocation of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleControlsLocation(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for TellTales of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await TellTales(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for Indicators of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Indicators(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for VehicleIdentificationNumber of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleIdentificationNumber(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for HandleLock of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await HandleLock(defaultSupplier._id, form1A, requestId)
        //console.log(`adding defaultSupplier for DriveTrainSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await DriveTrainSystem(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for Dimension of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Dimension(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for Payload of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await Payload(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for WindscreenWipingSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await WindscreenWipingSystem(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for SeatingArrangement of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await SeatingArrangement(defaultSupplier._id, form1A)
        // //console.log(`adding defaultSupplier for RPoint of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        // await RPoint(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for SeatingDimension of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await SeatingDimension(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for HPoint of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await HPoint(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for RearEntryProvision of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await RearEntryProvision(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for VehiclePerformance of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehiclePerformance(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for FireFightingSystem of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await FireFightingSystem(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for InstrumentCluster of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await InstrumentCluster(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for CriticalElectricalDevices of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await CriticalElectricalDevices(defaultSupplier._id, form1A)
        //console.log(`adding defaultSupplier for VehicleControlUnit of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
        await VehicleControlUnit(defaultSupplier._id, form1A)
        
        
        if (requestData) {  
          if(requestData.vehicle_type.value === '2-Wheeler'){
            vehicle_type = '2-Wheeler';
            //console.log(`adding defaultSupplier for Suspension of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
            await Suspension(defaultSupplier._id, form1A)
            //console.log(`adding defaultSupplier for TwoWheelerAggregates of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
            await TwoWheelerAggregates(defaultSupplier._id, form1A)
            //console.log(`adding defaultSupplier for TwoWheelerExternalProjection of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
            await TwoWheelerExternalProjection(defaultSupplier._id, form1A)
          } else{
            vehicle_type = '3-Wheeler';
            //console.log(`adding defaultSupplier for GrabHandle of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
            await GrabHandle(defaultSupplier._id, form1A)
            //console.log(`adding defaultSupplier for SteeringSuspensionAntiTheft of key: ${defaultSupplier.supplierKey} and id: ${defaultSupplier._id}`)
            await SteeringSuspensionAntiTheft(defaultSupplier._id, form1A)
          }
        }


      } else{
        //console.log(`inside findOrCreateForm1A :defaultSupplier is not found`)
      }
    }
    return form1A
}

exports.findOrCreateForm1A = findOrCreateForm1A

exports.insertNewForm1A = async (form) => {
  // const Form1AModel = require("../mongoSchemas/form1ASchema");
  return await form1ASchema.create(form);
};