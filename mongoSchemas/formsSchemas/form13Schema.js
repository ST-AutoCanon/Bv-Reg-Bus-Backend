const mongoose = require("mongoose")

const DriveTrainSystemSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Drive_Train: {
    label: { type: String, default: "Drive Train" },
    properties: {
      make_of_the_drive_train: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make and manufacturer’s address of the drive train" },
      },
      type_of_drive_train: {
        value: { type: String, default: "" },
        label: { type: String, default: "type of drive train " },
      },
      Select_the_type_of_motor_used_in_the_vehicle: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select the Type of motor(s) used in the vehicle",
        },
      },
      Select_the_Transmission_arrangement: {
        value: { type: String, default: "" },
        label: { type: String, default: "Transmission Arrangement parallel / Transaxial / others to precise" },
      },
    },
  },
  Traction_Motor: {
    label: { type: String, default: "Traction Motor" },
    properties: {
      Test_Voltage_of_motor: {
        value: { type: String, default: "" },
        label: { type: String, default: "Test Voltage of motor" },
        units: {type: String, default: "V"}
      },
      Nominal_speed_of_motor: {
        value: { type: String, default: "" },
        label: { type: String, default: "Nominal speed of motor" },
        units: {type: String, default: "Rpm"}
      },
      Motor_Maximum_Speed: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Motor Maximum Speed, Min –1 or by default  reducer outlet shaft / gear box speed (specify gear engaged)",
        },
        units: {type: String, default: "Rpm"}
      },
      Maximum_Power_Speed: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Maximum Power Speed  (min –1) and (km/h)",
        },
        units: {type: String, default: "Rpm & Km/h"}
      },
      Maximum_Power_kW: {
        value: { type: String, default: "" },
        label: { type: String, default: "Maximum Power (kW)" },
        units: {type: String, default: "KW"}
      },
      Maximum_Thirty_Minutes_Power: {
        value: { type: String, default: "" },
        label: { type: String, default: "Maximum Thirty Minutes Power (kW)" },
        units: {type: String, default: "KW"}
      },
      Maximum_Thirty_Minutes_speed: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Maximum Thirty Minutes speed km/h (Reference in AIS-039 (Rev.1) and AIS-040 (Rev.2)",
        },
        units: {type: String, default: "km/h"}
      },
      Range_as_per_AIS: {
        value: { type: String, default: "" },
        label: { type: String, default: "Range as per AIS 040 (Rev.1) (km)" },
        units: {type: String, default: "Km"}
      },
      Speed_at_the_beginning: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Speed at the beginning of the range (min –1)",
        },
        units: {type: String, default: "Km/h"}
      },
      Speed_at_the_end: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Speed at the end of the range (min –1 )",
        },
        units: {type: String, default: "Km/h"}
      },
      Make_of_Traction_motor: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make and manufacturer’s address of Traction motor" },
      },
      Model_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Model Number / Part number of Traction motor",
        },
      },
      Type_BLDC: {
        value: { type: String, default: "" },
        label: { type: String, default: "Type (BLDC, DC, AC etc)" },
      },
      Select_the_Current_Type: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select the Current Type and No of Phases",
        },
      },
      Separate_excitation: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Separate excitation / series / compound",
        },
      },
      Synchron_asynchron: {
        value: { type: String, default: "" },
        label: { type: String, default: "Synchron / asynchron" },
      },
      Coiled_rotor: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Coiled rotor / with permanent magnets / with housing",
        },
      },
      Number_of_Poles: {
        value: { type: String, default: "" },
        label: { type: String, default: "Number of Poles of the Motor" },
      },
      // Motor_power_curve: {
      //   value: { type: String, default: "" },
      //   label: {
      //     type: String,
      //     default: "Upload Graph showing the Motor power curve (kW) with motor RPM (min-1) / vehicle speed in (km/h)",
      //   },
      //   display: { type: Boolean, default: false },
      // },
      
    },
  },
})

const LubricationSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Lubrication: {
    label: { type: String, default: "Lubrication" },
    properties: {
      Select_type_of_lubrication_method: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select type of lubrication method recommended  for the following" },
      },
    },
  },
})

const VehicleControlUnitSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Vehicle_Control: {
    label: { type: String, default: "Vehicle Control Unit" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make",
        },
      },
      Model_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Model Number / Part number",
        },
      },
      Software_Version: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Software Version / Calibration ID",
        },
      },
      Hardware_Version: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Hardware Version",
        },
      },
    },
  },
});

const vehicleGeneralInformationSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Manufacturer_Details: {
    label: { type: String, default: "Manufacturer Details" },
    properties: {
      Basic_model: {
        value: { type: String, default: "" },
        label: { type: String, default: "Basic model" },
      },
      Vehicle_category: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle category (IS 14272) " },
        display: { type: Boolean, default: false },
      },
    },
  },
})

const generalArrangementOfTheVehicleSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  General_description_of_vehicle: {
    label: { type: String, default: "General description of vehicle" },
    properties: {
      Vehicle_Model: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle Model" },
      },
      Vehicle_Type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle Type" },
      },
      // upload_drawing_showing_Different_views_of_the_vehicle: {
      //   value: { type: String, default: "" },
      //   label: {
      //     type: String,
      //     default: "Upload Drawing showing Different views of the vehicle",
      //   },
      //   display: { type: Boolean, default: false },
      // },
    },
  },
})

const coolingSystemSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Cooling_System: {
    label: { type: String, default: "Cooling System" },
    properties: {
      Select_the_Cooling_System_for_each_device: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select the Cooling System for each device",
        },
      },
      Liquid_cooling_equipment_characteristics: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Liquid cooling equipment characteristics",
        },
      },
      Whether_Circulating_pump_is_provided: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Whether Circulating pump is provided",
        },
      },
      Characteristics_or_make_and_type_of_the_pump: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Characteristics or make(s) and type(s) of the pump",
        },
      },
      Thermostat_setting: {
        value: { type: String, default: "" },
        label: { type: String, default: "Thermostat : setting" },
      },
      // Radiator_drawing_or_make_and_type: {
      //   value: { type: String, default: "" },
      //   label: {
      //     type: String,
      //     // default: "Radiator : drawing(s) or make(s) and type(s)",
      //     default: "Description of the normal profile of charging system",
      //   },
      //   display: { type: Boolean, default: false },
      // },
      Relief_valve_pressure_setting: {
        value: { type: String, default: "" },
        label: { type: String, default: "Relief valve : pressure setting" },
      },
      Fan_Characteristics_or_make_and_type: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Fan : Characteristics or  make(s) and type(s)",
        },
      },
      Fan_duct: {
        value: { type: String, default: "" },
        label: { type: String, default: "Fan : duct" },
      },
      Blower_Characteristics_or_make_and_type: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Blower  : Characteristics or make(s) and type(s)",
        },
      },
      Standard_air_ducting: {
        value: { type: String, default: "" },
        label: { type: String, default: "Standard air ducting" },
      },
      Temperature_regulating_system: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Temperature regulating system  yes / no",
        },
      },
      Brief_description: {
        value: { type: String, default: "" },
        label: { type: String, default: "Brief description" },
      },
      Air_filter_make_type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Air filter  : make(s) type(s)" },
      },
      Motor_Outlet: {
        value: { type: String, default: "" },
        label: { type: String, default: "Motor Outlet : oC" },
        units: {type: String, default: "°C"} 
      },
      Controller_inlet: {
        value: { type: String, default: "" },
        label: { type: String, default: "Controller inlet : oC" },
        units: {type: String, default: "°C"} 
      },
      Battery_inlet: {
        value: { type: String, default: "" },
        label: { type: String, default: "Battery inlet : oC" },
        units: {type: String, default: "°C"} 
      },
      At_motor_reference_point: {
        value: { type: String, default: "" },
        label: { type: String, default: "At motor reference point(s) oC" },
        units: {type: String, default: "°C"} 
      },
      At_controller_reference_point: {
        value: { type: String, default: "" },
        label: { type: String, default: "At controller reference point(s) oC" },
        units: {type: String, default: "°C"} 
      },
      At_Battery_reference_point: {
        value: { type: String, default: "" },
        label: { type: String, default: "At Battery reference point(s) oC" },
        units: {type: String, default: "°C"} 
      },
    },
  },
})

const TractionBatterypackSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Traction_Battery_Pack: {
    label: { type: String, default: "Traction Battery Pack" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make and manufacturer’s address of Traction Battery Pack" },
      },
      Model_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Model No/ Part No of Battery Pack" },
      },
      Kind_of_Electro_Chemical_Chemistry: {
        value: { type: String, default: "" },
        label: { type: String, default: "Kind of Electro – Chemical Chemistry" },
      },
      Nominal_Voltage_at_Pack_level: {
        value: { type: String, default: "" },
        label: { type: String, default: "Nominal Voltage (V) at Pack level" },
        units: { type: String, default: "V" },
      },
      Nominal_Voltage_at_Cell_Level: {
        value: { type: String, default: "" },
        label: { type: String, default: "Nominal Voltage (V) at Cell Level" },
        units: { type: String, default: "V" },
      },
      Nominal_Voltage_at_Cell_Level: {
        value: { type: String, default: "" },
        label: { type: String, default: "Nominal Voltage (V) at Cell Level" },
        units: { type: String, default: "V" },
      },
      Number_of_Cells_Modules_Configuration: {
        value: { type: String, default: "" },
        label: { type: String, default: "Number of Cells/Modules and its Configuration" },
      },
      Battery_Energy: {
        value: { type: String, default: "" },
        label: { type: String, default: "Battery Energy (KWh)" },
        units: { type: String, default: "KWh" },
        //updated units
      },
      Battery_Capacity: {
        value: { type: String, default: "" },
        label: { type: String, default: "Battery capacity (C3 for Pure Electric Vehicle)" },
        units: { type: String, default: "AH" },
      },
      End_of_Discharge_Voltage_Value_Pack_Level: {
        value: { type: String, default: "" },
        label: { type: String, default: "End of Discharge Voltage Value (V) at Pack Level" },
        units: { type: String, default: "V" },
      },
      Provision_of_ventilation_for_battery: {
        value: { type: String, default: "" },
        label: { type: String, default: "Provision of ventilation for battery Yes / No " },
      },
      // Brief_description_of_the_battery_pack_ventilation: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "Brief description of the battery pack ventilation. Provide drawing if necessary." },
      //   display: { type: Boolean, default: false },
      // },
      Type_approval_Certififcate_number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Type approval Certififcate number as per applicable standard" },
      },
      Battery_Mass: {
        value: { type: String, default: "" },
        label: { type: String, default: "Battery Mass (kg)" },
        units: { type: String, default: "Kg" },
      },
      Brief_description_of_maintenance_procedure: {
        value: { type: String, default: "" },
        label: { type: String, default: "Brief description of maintenance procedure of battery pack, if any" },
      },
    },
  },
})

const BatteryMangementSystemSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Battery_Mangement_System: {
    label: { type: String, default: "Battery Mangement System" },
    properties: {
      Make_of_BMS: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make and manufacturer’s address of BMS" },
      },
      BMS_Model_Number_Part_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "BMS Model Number / Part Number" },
      },
      BMS_Software_Version: {
        value: { type: String, default: "" },
        label: { type: String, default: "BMS Software Version" },
      },
      BMS_Hardware_Version: {
        value: { type: String, default: "" },
        label: { type: String, default: "BMS Hardware Version" },
      },
      // BMS_Architecture_Circuit_Diagram: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "BMS Architecture Circuit Diagram" },
      // },
      Choose_BMS_Balancing_Type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Choose BMS Balancing Type" },
      },
      BMS_Comunicating_Protocol: {
        value: { type: String, default: "" },
        label: { type: String, default: "BMS Comunicating Protocol" },
      },
    },
  },
})

const InstrumentClusterSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Instrument_Cluster: {
    label: { type: String, default: "Instrument Cluster" },
    properties: {
      Make_of_the_Instrument_Cluster: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Instrument Cluster" },
        display: { type: Boolean, default: false },
      },
      Model_of_the_Instrument_Cluster: {
        value: { type: String, default: "" },
        label: { type: String, default: "Model of the Instrument Cluster" },
      },
      How_State_of_Charge_is_being_displayed: {
        value: { type: String, default: "" },
        label: { type: String, default: "How State of Charge is being displayed" },
      },
      State_charge_vehicle_is_Recommended_to_Charge: {
        value: { type: String, default: "" },
        label: { type: String, default: "At what State of charge vehicle / REESS is Recommended to Charge" },
      },
      State_of_Charge_indication_format: {
        value: { type: String, default: "" },
        label: { type: String, default: "State of Charge indication format" },
      },
      State_of_Charge_indication_format_battry: {
        value: { type: String, default: "" },
        label: { type: String, default: "State of Charge indication format at lower battery charge" },
      },
      Relationship_of_state_of_charge_indicator: {
        value: { type: String, default: "" },
        label: { type: String, default: "Relationship of state of charge indicator and the indication." },
      },
      Indication_of_state_of_charge_of_battery: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Indication of state of charge of battery reaches a level at which driving vehicle further may cause damage to batteries",
        },
      },
      Indication_when_Battery_completely_run_of_charge: {
        value: { type: String, default: "" },
        label: { type: String, default: "Indication when Battery completely run of charge" },
      },
    },
  },
})

const DCDCConverterSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  DC_DC_Converter: {
    label: { type: String, default: "DC – DC Converter" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make and manufacturer’s address of DC-DC Converter" },
      },
      Model_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Model Number / Part Number DC-DC Converter" },
      },
      Hardware_Version: {
        value: { type: String, default: "" },
        label: { type: String, default: "Hardware Version of DC-DC Converter" },
      },
      Input_Voltage_range: {
        value: { type: String, default: "" },
        label: { type: String, default: "Input Voltage range of DC-DC Converter" },
        // units: { type: String, default: "V" },
      },
      Output_Voltage_range: {
        value: { type: String, default: "" },
        label: { type: String, default: "Output Voltage range of DC-DC Converter" },
        // units: { type: String, default: "V" },
      },
    },
  },
})

const InsulatingCategorySchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Insulating_Category: {
    label: { type: String, default: "Insulating Category" },
    properties: {
      Ingress_Protection_Rating: {
        value: { type: String, default: "" },
        label: { type: String, default: "Ingress Protection(IP) Rating of Electrical System" },
      },
    },
  },
})

const ChargerSpecificationSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Charger: {
    label: { type: String, default: "Charger" },
    properties: {
      Select_Type_of_Charger_used: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select Type of Charger used / Provided with Vehicle" },
      },
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the charger" },
      },
      Model: {
        value: { type: String, default: "" },
        label: { type: String, default: "Model of Charger" },
      },
      Version_of_the_software: {
        value: { type: String, default: "" },
        label: { type: String, default: "Version of the software used in the Vehicle" },
      },
      Version_of_the_hardware: {
        value: { type: String, default: "" },
        label: { type: String, default: "Version of the hardware used in the vehicle" },
      },
      Select_the_the_type_of_charger: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select the the type of charger " },
      },
      Charger_Standard_Protocol: {
        value: { type: String, default: "" },
        label: { type: String, default: "Charger's Standard Protocol" },
      },
      // Normal_Charging_Profile: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "Normal Charging Profile " },
      //   display: { type: Boolean, default: false },
      // },
    },
  },
  Specifications: {
    label: { type: String, default: "Specifications " },
    properties: {
      Select_the_No_Phases: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select the No Phases Required for Charger" },
      },
      Input_Nominal_Voltage: {
        value: { type: String, default: "" },
        label: { type: String, default: "Input Nominal Voltage (V) & frequency (Hz) with tolerances." },
        // units: { type: String, default: "Volts & Hz" },
      },
      Output_Voltage_Range: {
        value: { type: String, default: "" },
        label: { type: String, default: "Output Voltage Range (V) and Current Range (A)" },
        // units: { type: String, default: "Volts & A" },
      },
      Reset_period_recommended: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Reset period recommended between the end of the discharge and the start of  the charge",
        },
        units: { type: String, default: "Minutes/Hours" },
      },
      Recommended_duration_of_a_complete_charge: {
        value: { type: String, default: "" },
        label: { type: String, default: "Recommended duration of a complete charge  " },
        units: { type: String, default: "Minutes/Hours" },
      },
    },
  },
  on_board_charger: {
    label: { type: String, default: "In case of on-board charger " },
    properties: {
      Continuous_rating_of_charger_socket: {
        value: { type: String, default: "" },
        label: { type: String, default: "Continuous rating of charger socket (A)" },
        units: { type: String, default: "Amps" },
      },
      Time_rating_charger_socket_if_any: {
        value: { type: String, default: "" },
        label: { type: String, default: "Time rating (h) of charger socket, if any" },
      },
      Whether_soft_start_facility: {
        value: { type: String, default: "" },
        label: { type: String, default: "Whether soft-start facility" },
      },
      Maximum_initial_in_rush_current: {
        value: { type: String, default: "" },
        label: { type: String, default: "Maximum initial in-rush current (A)" },
        // units: { type: String, default: "Amps" },
      },
      Charger_Power_ratings: {
        value: { type: String, default: "" },
        label: { type: String, default: "Charger Power ratings" },    
      },
      Charger_Connector_type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Charger Connector type" }, 
      },
    },
  },
  // Electrical_details_of_vehicle: {
  //   label: { type: String, default: "Electrical details of vehicle for functional safety " },
  //   properties: {
  //     Upload_Schematic_Drawing: {
  //       value: { type: String, default: "" },
  //       label: { type: String, default: "Upload Schematic Drawing highlighting all the major Electrical  devices in the vehicle" },
  //       display: { type: Boolean, default: false },
  //     },
  //   },
  // },


  Portable_Residual_Current_Device_PRCD: {
    label: { type: String, default: "Portable Residual Current Device (PRCD)" },
    properties: {    
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the charger" },
      },
      Model: {
        value: { type: String, default: "" },
        label: { type: String, default: "Model of Charger" },
      },      
    },
  },


})

const ElectricalSafetyDeviceSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Specifications_of_circuit_breakers_or_fuses_used_for_protection_of_batteries_or_power_train: {
    label: { type: String, default: "Specifications of circuit breakers/ fuses used for protection of batteries / power-train " },
    properties: {
      IS_IEC_specifications: {
        value: { type: String, default: "" },
        label: { type: String, default: "IS / IEC specifications of Circuit Breaker" },
      },
      Rating: {
        value: { type: String, default: "" },
        label: { type: String, default: "Rating (A)" },
        units: { type: String, default: "Amps" },
      },
      Opening_time: {
        value: { type: String, default: "" },
        label: { type: String, default: "Opening time (ms)" },
        units: { type: String, default: "ms" },
      },
    },
  },
})

const VehicleElectricalSpecificationSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Electrical_system: {
    label: { type: String, default: "Electrical system" },
    properties: {
      Working_voltage_Operating_Voltage: {
        value: { type: String, default: "" },	
        label: { type: String, default: "Working voltage/ Operating Voltage of Electrical System / Traction System" },
        units: { type: String, default: "V" },
      },
      // Schematic_highlighting_physical_location: {
      //   value: { type: String, default: "" },
      //   label: {
      //     type: String,
      //     default: "Schematic highlighting physical location of live parts having working voltage greater than 60 V DC or 25 V AC",
      //   },
      //   display: { type: Boolean, default: false },
      // },
    },
  },
  Electric_harness: {
    label: { type: String, default: "Electric cables / connectors / wiring harness" },
    properties: {
      Select_IEC_Protection_Class_of_Electric_cables: {
        value: { type: String, default: "" },
        label: { type: String, default: "IEC protection class" },
      },
      Specify_the_Insulation_material_Used: {
        value: { type: String, default: "" },
        label: { type: String, default: "Specify the Insulation material Used in Electric cables / connectors / wiring harness" },
      },
      Is_Conduits_provided: {
        value: { type: String, default: "" },
        label: { type: String, default: "Is Conduits provided?" },
      },
      // List_of_exposed_conductive: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "List of exposed conductive / Live parts of on-board equipment." },
      //   display: { type: Boolean, default: false },
      // },
      Any_potential_equalization_resistance: {
        value: { type: String, default: "" },
        label: { type: String, default: "Any potential equalization resistance used to electrically connect these parts" },
      },
      If_yes_give_details: {
        value: { type: String, default: "" },
        label: { type: String, default: "If yes, give details" },
      },
      List_of_failures: {
        value: { type: String, default: "" },
        label: { type: String, default: "List of failures due to which the vehicle will come to standstill" },
      },
      List_of_conditions_under_which_the_performance: {
        value: { type: String, default: "" },
        label: { type: String, default: "List of conditions under which the performance of vehicle is limited and how." },
      },
    },
  },
})

const PowerControllerSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Power_Controller: {
    label: { type: String, default: "Power Controller" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make and manufacturer’s address of Power Controller" },
      },

      Model: {
        value: { type: String, default: "" },
        label: { type: String, default: "Model / Part Number of Power Controller" },
      },
      Version_of_Controller_Software: {
        value: { type: String, default: "" },
        label: { type: String, default: "Version of Controller Software" },
      },

      Version_of_Controller_Hardware: {
        value: { type: String, default: "" },
        label: { type: String, default: "Version of Controller Hardware" },
      },

      Specify_the_Type_of_Controller: {
        value: { type: String, default: "" },
        label: { type: String, default: "Specify the Type of Controller used in the Vehicle" },
      },

      Select_the_Control_Principle: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select the Control Principle of the Controller" },
      },

      Maximum_effective_current: {
        value: { type: String, default: "" },
        label: { type: String, default: "Maximum effective current supplied to the Motor (A)" },
        units: { type: String, default: "Amps" },
      },
      Voltage_Utilization: {
        value: { type: String, default: "" },
        label: { type: String, default: "Voltage Utilization range of Controller" },
        units: { type: String, default: "Volts" },
      },
    },
  },
})

const VehiclePerformanceSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Performance: {
    label: { type: String, default: "Performance" },
    properties: {
  
      Electrical_energy_consumption: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Electrical energy consumption of Vehicle in W-h/km, as per AIS-040",          
        },   
        units: { type: String, default: "W-h/Km" },     
      },
     
    
    },
  },
});


const form13Schema = mongoose.Schema(
  {
    Drive_Train_System: {
      label: { type: String, default: "Drive Train System" },
      DriveTrainSystemData: [DriveTrainSystemSchema],
    },
    Lubrication: {
      label: { type: String, default: "Lubrication" },
      LubricationData: [LubricationSchema],
    },
    Vehicle_General_Information: {
      label: { type: String, default: "Vehicle General Information" },
      vehicleGeneralInformation: [vehicleGeneralInformationSchema],
    },
    General_arrangement_of_the_vehicle: {
      label: { type: String, default: "General arrangement of the vehicle" },
      generalArrangementOfTheVehicle: [generalArrangementOfTheVehicleSchema],
    },
    Cooling_System: {
      label: { type: String, default: "Cooling System" },
      coolingSystem: [coolingSystemSchema],
    },
    Traction_Battery_Pack: {
      label: { type: String, default: "Traction Battery Pack" },
      TractionBatterypack: [TractionBatterypackSchema],
    },
    Battery_Mangement_System: {
      label: { type: String, default: "Battery Mangement System" },
      BatteryMangementSystem: [BatteryMangementSystemSchema],
    },
    Instrument_Cluster: {
      label: { type: String, default: "Instrument Cluster" },
      InstrumentCluster: [InstrumentClusterSchema],
    },
    DC_DC_Converter: {
      label: { type: String, default: "DC-DC Converter" },
      DCDCConverter: [DCDCConverterSchema],
    },
    Insulating_Category: {
      label: { type: String, default: "Insulating Category" },
      InsulatingCategory: [InsulatingCategorySchema],
    },
    Charger_Specification: {
      label: { type: String, default: "Charger Specification" },
      ChargerSpecification: [ChargerSpecificationSchema],
    },
    Electrical_Safety_Device: {
      label: { type: String, default: "Electrical Safety Device" },
      ElectricalSafetyDevice: [ElectricalSafetyDeviceSchema],
    },
    Vehicle_Electrical_Specification: {
      label: { type: String, default: "Vehicle Electrical Specification" },
      VehicleElectricalSpecification: [VehicleElectricalSpecificationSchema],
    },
    Controller: {
      label: { type: String, default: "Controller" },
      PowerController: [PowerControllerSchema],
    },
    Vehicle_Performance: {
      label: { type: String, default: "Vehicle Performance" },
      VehiclePerformance: [VehiclePerformanceSchema],
    },
    Vehicle_Control_Unit: {
      label: { type: String, default: "Vehicle Control Unit" },
      VehicleControlUnit: [VehicleControlUnitSchema],
    },
    homologationRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomologationRequest",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("form13", form13Schema)
