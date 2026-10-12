const mongoose = require("mongoose");

const TyresSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
 
  

  Front_Tyre: {
    label: { type: String, default: "Front Tyre" },
    properties: {
      Laden: {
        value: { type: String, default: "" },
        label: { type: String, default: " Front Laden" },     
        units: { type: String, default: "kg/cm² /kPa/ psi" }, 
      },
      Tyre_size_designation_including_ply_rating: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Tyre size designation including ply rating",
        },
      },
      Speed_index: {
        value: { type: String, default: "" },
        label: { type: String, default: "Speed index" },
      },
      Load_index_Load_rating: {
        value: { type: String, default: "" },
        label: { type: String, default: "Load index / Load rating" },
      },
      Tyre_Type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Front Tyre Type" },
      },
      tyre_vehicle_type:{
        value: { type: String, default: "" },
        label: { type: String, default: "Tyre Vehicle Type" },
        display: { type: Boolean, default: false },
      }
   
    },
  },
  Rear_Tyre: {
    label: { type: String, default: "Rear Tyre" },
    properties: {
      Laden: {
        value: { type: String, default: "" },
        label: { type: String, default: " Rear Laden" },    
        units: { type: String, default: "kg/cm² /kPa/ psi" },   
      },
      Tyre_size_designation_including_ply_rating: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Tyre size designation including ply rating",
        },
      },
      Speed_index: {
        value: { type: String, default: "" },
        label: { type: String, default: "Speed index" },
      },
      Load_index_Load_rating: {
        value: { type: String, default: "" },
        label: { type: String, default: "Load index / Load rating" },
      },
      Tyre_Type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Rear Tyre Type" },
      },   
    },
  },
  
  
});

const WheelRimSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Wheel_Rim_Size: {
    label: { type: String, default: "Wheel Rim Size" },
    properties: {
      Wheel_rim_size: {
        value: { type: String, default: "" },
        label: { type: String, default: "Wheel rim size" },
        display: { type: Boolean, default: false },
      },
      Front_Wheel_Rim_Size: {
        value: { type: String, default: "" },
        label: { type: String, default: " Front Wheel rim size" },
      },
      Rear_Wheel_Rim_Size: {
        value: { type: String, default: "" },
        label: { type: String, default: "Rear Wheel rim size" },
      },
    },
  },
});

const TractionBatterypackSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Traction_Battery_Pack: {
    label: { type: String, default: "Traction Battery Pack" },
    properties: {
      Battery_rating: {
        value: { type: String, default: "" },
        label: { type: String, default: "Battery rating (Ah)" },
        units: { type: String, default: "Ah" },
      },
    },
  },
});

const WindscreenwipingSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Wiping_System: {
    label: { type: String, default: "Wiping System" },
    properties: {
      Make_of_Wiper_Motor: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Wiper Motor" },
      },
      Wiping_system: {
        value: { type: String, default: "" },
        label: { type: String, default: "Wiping system (Brief description)" },
      },
    },
  },
});

const VehicleGeneralInformationScehma = mongoose.Schema({
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
      Type_Of_Vehicle: {
        value: { type: String, default: "" },
        label: { type: String, default: "Type Of Vehicle" },
      },
      Vehicle_category: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle category (IS 14272) " },
        display: { type: Boolean, default: false },
      },
      Manufacturer_name_and_address: {
        value: { type: String, default: "" },
        label: { type: String, default: "Manufacturer’s name and address" },
      },
      Name_and_address_of_the_vehicle_importer: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Name and address of the vehicle importer",
        },
        display: { type: Boolean, default: false },
      },
      variant: {
        value: { type: String, default: "" },
        label: { type: String, default: "variant(s)" },
        display: { type: Boolean, default: false },
      },
    },
  },

  Variants: {
    label: { type: String, default: "Variants" },
    properties: {
     
      Type_Of_Vehicle: {
        value: { type: String, default: "" },
        label: { type: String, default: "Type or Description" },
      },
      Vehicle_category: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category of Variant(s)" },       
      }, 
   
    },
  },

})

const GeneralarrangementofthevehicleSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  General_arrangement_of_the_vehicle: {
    label: { type: String, default: "General arrangement of the vehicle" },
    properties: {
      Number_of_seating_positions: {
        value: { type: String, default: "" },
        label: { type: String, default: "Number of seating positions" },
        display: { type: Boolean, default: false },
      },
    },
  },
})

const Vehicle_DimensionsSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  General_arrangement_of_the_vehicle_dimension: {
    label: { type: String, default: "General arrangement of the vehicle" },
    properties: {
      Wheel_base: {
        value: { type: String, default: "" },
        label: { type: String, default: "Wheel base (mm) " },
        units: { type: String, default: "mm" },
        // display: { type: Boolean, default: false },
      },
      Overall_width: {
        value: { type: String, default: "" },
        label: { type: String, default: "Overall width (mm)" },
        units: { type: String, default: "mm" }
      },
      Overall_length: {
        value: { type: String, default: "" },
        label: { type: String, default: "Overall length (mm)" },
        units: { type: String, default: "mm" }
      },
      Overall_height: {
        value: { type: String, default: "" },
        label: { type: String, default: "Overall height (Unladen) (mm)" },
        units: { type: String, default: "mm" }
      },
      Front_track: {
        value: { type: String, default: "" },
        label: { type: String, default: "Front track (mm)" },
        units: { type: String, default: "mm" }
      },
      Rear_track: {
        value: { type: String, default: "" },
        label: { type: String, default: "Rear track (mm)" },
        units: { type: String, default: "mm" }
      },
      Min_ground_clearance: {
        value: { type: String, default: "" },
        label: { type: String, default: "Min. ground clearance (mm)" },
        units: { type: String, default: "mm" }
      },
      Cargo_box_dimensions_if_fitted: {
        value: { type: String, default: "" },
        label: { type: String, default: "Cargo box dimensions (l x b x h) (mm)" },
        units: { type: String, default: "mm" }
      },
    },
  },
  Body_Overhang: {
    label: { type: String, default: "Body Overhang" },
    properties: {
      Front_Body_Overhang: {
        value: { type: String, default: "" },
        label: { type: String, default: "Front Body Overhang (mm)" },
        units: { type: String, default: "mm" }
      },
      Rear_Body_Overhang: {
        value: { type: String, default: "" },
        label: { type: String, default: "Rear Body Overhang (mm)" },
        units: { type: String, default: "mm" }
      },
      // Upload_drawing_showing_the_seating_layout_of_the_vehicle: {
      // value: { type: String, default: "" },
      // label: {
      //   type: String,
      //  default: "Upload drawing showing the seating layout of the vehicle",
      //   },
      // display: { type: Boolean, default: false },
      //  },
    },
  },
  Frame: {
    label: { type: String, default: "Frame" },
    properties: {
      Frames_Long_member_size: {
        value: { type: String, default: "" },
        label: { type: String, default: "Frames Long member size(mm)" },
        // units: { type: String, default: "mm" }
      },
      Number_of_cross_members_if_any: {
        value: { type: String, default: "" },
        label: { type: String, default: "Number of cross members if any" },
      },
    },
  },
  Frame_Overhang: {
    label: { type: String, default: "Frame Overhang" },
    properties: {
      Frames_overhang_at_front: {
        value: { type: String, default: "" },
        label: { type: String, default: "Frames overhang at front" },
        units: { type: String, default: "mm" }
      },
      Frames_overhang_at_rear_end: {
        value: { type: String, default: "" },
        label: { type: String, default: "Frames overhang at rear end" },
        units: { type: String, default: "mm" }
      },
      Load_body_platform_area: {
        value: { type: String, default: "" },
        label: { type: String, default: "Load body platform area" },
        units: { type: String, default: "mm Sq" },
      },
    },
  },
});

const WeightsSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Kerb_Weight: {
    label: { type: String, default: "Kerb Weight" },
    properties: {
      Vehicle_kerb_weight: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle kerb weight " },
        units: { type: String, default: "Kg" },
        display: { type: Boolean, default: false },
      },
      Kerb_weight_front_axle: {
        value: { type: String, default: "" },
        label: { type: String, default: "Front axle" },
        units: { type: String, default: "Kg" }
      },
      Kerb_weight_rear_axle: {
        value: { type: String, default: "" },
        label: { type: String, default: "Rear axle" },
        units: { type: String, default: "Kg" }
      },
      Kerb_weight_Total: {
        value: { type: String, default: "" },
        label: { type: String, default: "Total" },
        units: { type: String, default: "Kg" }
      },
    },
  },
  Gross_Vehicle_Weight: {
    label: { type: String, default: "Gross Vehicle Weight" },
    properties: {
      Gross_Vehicle_Weight: {
        value: { type: String, default: "" },
        label: { type: String, default: "Gross Vehicle Weight " },
        units: { type: String, default: "Kg" },
        display: { type: Boolean, default: false },
      },
      GVW_Distribution_on_front_axle: {
        value: { type: String, default: "" },
        label: { type: String, default: "GVW Permissible FAW" },
        units: { type: String, default: "Kg" }
      },
      GVW_Distribution_on_rear_axle: {
        value: { type: String, default: "" },
        label: { type: String, default: "GVW Permissible RAW" },
        units: { type: String, default: "Kg" }
      },
      // Other_axle: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "Other axle" },
      //   units: { type: String, default: "Kg" }
      // },
    },
  },
  Gradability: {
    label: { type: String, default: "Gradability" },
    properties: {
      Maximum_gradeability: {
        value: { type: String, default: "" },
        label: { type: String, default: "Maximum gradeability" },
        units: { type: String, default: "% or °(Degree)" }
      },
    },
  },
  Maximum_Carrying_capacity: {
    label: { type: String, default: "Maximum Carrying capacity" },
    properties: {
      
      Max_GCW_kg: {
        value: { type: String, default: "" },
        label: { type: String, default: "Maximum GCW kg (for articulated or combination vehicles) " },
        display: { type: Boolean, default: false },
      },
    },
  },
})

const SteeringSuspensionSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Steering_System: {
    label: { type: String, default: "Steering System" },
    properties: {
      Select_Type_Steering_control_provided: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select Type Steering control provided",
        },
        display: { type: Boolean, default: false },
      },

      Specify_steering_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Specify steering gear ratio" },
        display: { type: Boolean, default: false },
      },
      Steering_wheel_diameter: {
        value: { type: String, default: "" },
        label: { type: String, default: "Steering wheel diameter mm" },
        units: { type: String, default: "mm" }
      },
    },
  },
  
  

  Front_Suspension: {
    label: { type: String, default: "Front Suspension" },
    properties: {
      Front_Type_Description: {
        value: { type: String, default: "" },
        label: { type: String, default: " Front Type / Description" },       
      },
      Type_of_springs_provided_at_Front: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of springs provided at Front",
        },
        
      },
      Antiroll_bar_if_provided: {
        value: { type: String, default: "" },
        label: { type: String, default: "Anti-roll bar if provided" },
       
      },
      Type_of_Shock_absorbers_provided_at_the_Front: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of Shock absorbers provided at the Front",
        },
       
      },
    },
  },
  Rear_Suspension: {
    label: { type: String, default: "Rear Suspension" },
    properties: {
      Rear_Type_Description: {
        value: { type: String, default: "" },
        label: { type: String, default: " Rear Type / Description" },
       
      },
      Type_of_springs_provided_at_Rear: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of springs provided at Rear",
        },
     
      },
      Antiroll_bar_if_provided: {
        value: { type: String, default: "" },
        label: { type: String, default: "Anti-roll bar if provided" },

      },
      Type_of_Shock_absorbers_provided_at_the_Rear: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of Shock absorbers provided at the Rear",
        },

      },
    },
  },
})

const SuspensionSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  
 
  Front_Suspension: {
    label: { type: String, default: "Front Suspension" },
    properties: {
      Front_Type_Description: {
        value: { type: String, default: "" },
        label: { type: String, default: " Front Type / Description" },       
      },
      Type_of_springs_provided_at_Front: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of springs provided at Front",
        },
        
      },
      Antiroll_bar_if_provided: {
        value: { type: String, default: "" },
        label: { type: String, default: "Anti-roll bar if provided" },
       
      },
      Type_of_Shock_absorbers_provided_at_the_Front: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of Shock absorbers provided at the Front",
        },
       
      },
    },
  },
  Rear_Suspension: {
    label: { type: String, default: "Rear Suspension" },
    properties: {
      Rear_Type_Description: {
        value: { type: String, default: "" },
        label: { type: String, default: " Rear Type / Description" },
       
      },
      Type_of_springs_provided_at_Rear: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of springs provided at Rear",
        },
     
      },
      Antiroll_bar_if_provided: {
        value: { type: String, default: "" },
        label: { type: String, default: "Anti-roll bar if provided" },

      },
      Type_of_Shock_absorbers_provided_at_the_Rear: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of Shock absorbers provided at the Rear",
        },

      },
    },
  },
})

const BrakesSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Brief_Brake_Information: {
    label: { type: String, default: "Brief Brake Information" },
    properties: { 
      Type_of_Shock_absorbers_provided_at_the_front_and_Rear: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type of Shock absorbers provided at the front and Rear ",
        },
        display: { type: Boolean, default: false },
      },
    },
  },
  Parts_of_Brake_System: {
    label: { type: String, default: "Parts of Brake System" },
    properties: {
      Front_and_rear_braking_area: {
        value: { type: String, default: "" },
        label: { type: String, default: "Front and rear braking area" },
        display: { type: Boolean, default: false },
      },
    },
  },
  ABS: {
    label: { type: String, default: "ABS" },
    properties: {
      Whether_ABS_provided: {
        value: { type: String, default: "" },
        label: { type: String, default: "Whether ABS provided" },
        display: { type: Boolean, default: false },
      },
    },
  },
  Brake_Types: {
    label: { type: String, default: "Brake Types" },
    properties: {
      type_of_friction_front_wheel_brakes: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select type of friction member used in front wheel brakes",
        },
        display: { type: Boolean, default: false },
      },
      type_of_friction_Rear_wheel_brakes: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select type of friction member used in Rear wheel brakes",
        },
        display: { type: Boolean, default: false },
      },
    },
  },
  Free_Play_and_Ratio: {
    label: { type: String, default: "Free Play and Ratio's" },
    properties: {
      whether_Auto_Slac__Fitted: {
        value: { type: String, default: "" },
        label: { type: String, default: "whether Auto Slack Adjuster Fitted" },
      },
    },
  },
  Parking_Brake: {
    label: { type: String, default: "Parking Brake" },
    properties: {
      Parking_Brake1: {
        value: { type: String, default: "" },
        label: { type: String, default: "Parking Brake" },
      },
      Select_Type_of_Braking_System: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select Type of Service Braking System" },       
      },
    },
  },
  Re_Generative_Brake: {
    label: { type: String, default: "Re Generative Brake" },
    properties: {
      Is_there_any_secondary_brake: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Is there any secondary brake ? other than service and parking brake",
        },
      },
    },
  },
})

const SteeringSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Steering_System: {
    label: { type: String, default: "Steering System" },
    properties: {
      Select_Type_Steering_control_provided: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Select Type Steering control provided",
        },
        display: { type: Boolean, default: false },
      },
      Specify_steering_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Specify steering gear ratio" },
        display: { type: Boolean, default: false },
      },
      Steering_wheel_diameter: {
        value: { type: String, default: "" },
        label: { type: String, default: "Steering wheel diameter mm" },
        units: { type: String, default: "mm" }
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
    
      Vehicle_Max_Speed_in_unladen_condition: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Vehicle Max Speed in unladen condition",
        },
        units: { type: String, default: "Km/h" },
      },
      Vehicle_Max_Speed_in_laden_condition: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Vehicle Max Speed in laden condition",
        },
        units: { type: String, default: "Km/h" },
      },
    },
  },
});

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
        display: { type: Boolean, default: false },
      },
    },
  },
})




const DriveTrainSystemSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Transmission: {
    label: { type: String, default: "Transmission" },
    properties: {
   
      // type_Transmission_arrangement: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "Select the type of Transmission arrangement" },
      // },
      Reverse_gear_max_speed: {
        value: { type: String, default: "" },
        label: { type: String, default: "Whether reverse gear or mode provided if yes specify max speed " },
        display: { type: Boolean, default: false },
      },
      Type_Gear_box_vehicle: {
        value: { type: String, default: "" },
        label: { type: String, default: "Select Type of Gear box used in the vehicle" },
        display: { type: Boolean, default: false },
      },
      Make_or_Model: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make/Model" }
      },
      
      Number_of_gears: {
        value: { type: String, default: "" },
        label: { type: String, default: "Number of gears" }
      },    
     
      
      First_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "First gear ratio" },
        display: { type: Boolean, default: false },
      },
      
      Second_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Second gear ratio" },
        display: { type: Boolean, default: false },
      },
      
      Third_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Third gear ratio" },
        display: { type: Boolean, default: false },
      },
      
      Fourth_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Fourth gear ratio" },
        display: { type: Boolean, default: false },
      },
      
      Fifth_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Fifth gear ratio" },
        display: { type: Boolean, default: false },
      },
      
      Sixth_gear_ratio: {
        value: { type: String, default: "" },
        label: { type: String, default: "Sixth gear ratio" },
        display: { type: Boolean, default: false },
      }
      
    },
  },
  Clutch: {
    label: { type: String, default: "Clutch" },
    properties: {     
      Type: {
        value: { type: String, default: "" },
        label: { type: String, default: "Type" },
        display: { type: Boolean, default: false },
      },
    },
  },
})


const form7Schema = mongoose.Schema(
  {
    Tyres: {
      label: { type: String, default: "Tyres" },
      TyresData: [TyresSchema],
    },
    Wheel_Rim: {
      label: { type: String, default: "Wheel Rim" },
      WheelRim: [WheelRimSchema],
    },
    Traction_Battery_Pack: {
      label: { type: String, default: "Traction Battery Pack" },
      TractionBatterypack: [TractionBatterypackSchema],
    },
    Windscreen_wiping: {
      label: { type: String, default: "Windscreen wiping" },
      Windscreenwiping: [WindscreenwipingSchema],
    },
    Vehicle_General_Information: {
      label: { type: String, default: "Vehicle General Information" },
      VehicleGeneralInformation: [VehicleGeneralInformationScehma],
    },
    General_arrangement_of_the_vehicle: {
      label: { type: String, default: "General arrangement of the vehicle" },
      Generalarrangementofthevehicle: [GeneralarrangementofthevehicleSchema],
    },
    Vehicle_Dimensions: {
      label: { type: String, default: "Vehicle Dimensions" },
      VehicleDimensions: [Vehicle_DimensionsSchema],
    },
    Weights: {
      label: { type: String, default: "Weights" },
      Weights: [WeightsSchema],
    },
    Suspension: {
      label: { type: String, default: "Suspension" },
      Suspension: [SuspensionSchema],
    },
    Brakes: {
      label: { type: String, default: "Brakes" },
      Brakes: [BrakesSchema],
    },
    Steering: {
      label: { type: String, default: "Steering" },
      Steering: [SteeringSchema],
    },
    SteeringSuspension: {
      label: { type: String, default: "Steering + Suspension + Handle Lock / Anti Theft Device" },
      SteeringSuspensionData: [SteeringSuspensionSchema],
    },
    Vehicle_Performance: {
      label: { type: String, default: "Vehicle Performance" },
      VehiclePerformance: [VehiclePerformanceSchema],
    },
    Vehicle_Electrical_Specification: {
      label: { type: String, default: "Vehicle Electrical Specification" },
      VehicleElectricalSpecification: [VehicleElectricalSpecificationSchema],
    },
    Drive_Train_System: {
      label: { type: String, default: "Drive Train System" },
      DriveTrainSystemData: [DriveTrainSystemSchema],
    },
    homologationRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomologationRequest",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("form7", form7Schema);