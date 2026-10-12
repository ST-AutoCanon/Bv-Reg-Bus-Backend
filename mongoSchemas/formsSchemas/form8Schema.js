const mongoose = require("mongoose");

const WheelRimSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Front_Wheel_Rim: {
    label: { type: String, default: "Front Wheel Rim" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of front wheel Rim" },
        display: { type: Boolean, default: false },
      },
      BIS_License_TAC_Number_with_its_Validity: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "BIS License/TAC Number with its Validity",
        },
        display: { type: Boolean, default: false },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Rear_Wheel_Rim: {
    label: { type: String, default: "Rear Wheel Rim" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Rear Wheel Rim" },
        display: { type: Boolean, default: false },
      },
      BIS_License_TAC_Number_its_Validity: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "BIS License/TAC Number & its Validity",          
        },
        display: { type: Boolean, default: false },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const HornSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Horn: {
    label: { type: String, default: "Horn" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Horn" },
        display: { type: Boolean, default: false },
      },
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number & Its Validity" },
        display: { type: Boolean, default: false },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const TyresSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Front_tyre: {
    label: { type: String, default: "Front Tyre" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Tyre" },
        
      },
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number / BIS License and its Validity" },
      
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
      tyre_vehicle_type:{
        value: { type: String, default: "" },
        label: { type: String, default: "Tyre Vehicle Type" },
        display: { type: Boolean, default: false },
      }
    },
  },
  Rear_tyre: {
    label: { type: String, default: "Rear Tyre" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Tyre" },
        
      },
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number / BIS License and its Validity" },
      
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Any_other_Tyre: {
    label: { type: String, default: "Any Other Tyre" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Tyre" },
        
      },
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number / BIS License and its Validity" },
      
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
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
        label: { type: String, default: "Make of Traction Battery Pack" },
        display: { type: Boolean, default: false },
      },
      Type_approval_Certififcate_number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Type approval Certififcate number as per applicable standard and it's validity",
        },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const HeadLampSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Main_Beam_Head_Lamp_LED_type: {
    label: { type: String, default: "Main Beam Head Lamp LED type" },
    properties: {
      Main_Beam_Head_Lamp_make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Main Beam Head Lamp make" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Main_Beam_Headlamp_Filament_Type: {
    label: { type: String, default: "Main Beam Headlamp Filament Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of main beam bulb" },
        display: { type: Boolean, default: false },
      },
      Category_of_bulb: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category of bulb as per AIS-034" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of Main beam headlamp bulb",
        },
          display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Dipped_Beam_Headlamp_LED_Type: {
    label: { type: String, default: "Dipped Beam Headlamp LED Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Dipped beam head lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Dipped_Beam_Headlamp_Filament_Type: {
    label: { type: String, default: "Dipped Beam Headlamp Filament Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Dipped beam head lamp" },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const DaytimeRunningLampSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Daytime_Running_Lamp: {
    label: { type: String, default: "Daytime Running Lamp" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Day time running lamp" },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC and Its Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
});

const PositionLampsSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Front_Position_Lamp_LED_Type: {
    label: { type: String, default: "Front Position Lamp LED Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of front Position lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Front Position Lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Front_Position_Lamp_Bulb_Type: {
    label: { type: String, default: "Front Position Lamp Bulb Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Front Position Lamp" },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_034: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-034" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Front Position Lamps" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Parking_Lamp_Led_Rear: {
    label: { type: String, default: "Parking Lamp LED Rear" },
    properties: {
      // Parking_Lamp_led_Rear: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "Parking Lamp LED – Rear" },
      //   display: { type: Boolean, default: false },
      // },
      Make_of_Parking_lamp_led_rear: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Parking LED bulb rear" },
        // display: { type: Boolean, default: false },
      },
      Category_as_per_AIS035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Rear Parking LED" },        
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Parking_Lamp_Bulb_Rear: {
    label: { type: String, default: "Parking Lamp Bulb Rear" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Parking lamp bulb rear" },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Rear Parking Lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Stop_Lamp_LED_Type: {
    label: { type: String, default: "Stop Lamp LED Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Stop lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Stop lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Stop_lamp_bulb_Filament_Type: {
    label: { type: String, default: "Stop lamp bulb Filament Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Stop lamp bulb" },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Stop Lamp bulb" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const RearRegistrationPlatelampSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Registration_Plate_Lamp_LED_Type: {
    label: { type: String, default: "Registration Plate Lamp LED Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Rear Registration Plate Lamp",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC number of Rear Registration Plate Lamp",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Registration_Plate_Lamp_bulb_type: {
    label: { type: String, default: "Registration Plate Lamp bulb type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Number Plate Lamp Bulb" },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC of Number Plate Lamp Bulb" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const DirectionIndicatorLampSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Front_Direction_Indicator_LED_Type: {
    label: { type: String, default: "Front Direction Indicator LED Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Front Direction Indicator",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of Front Direction Indicator",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Front_Direction_indicator_Bulb_Type: {
    label: { type: String, default: "Front Direction indicator Bulb Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Front Direction Indicators",
        },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of Direction Indicator",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Rear_Direction_Indicator_LED_Type: {
    label: { type: String, default: "Rear Direction Indicator LED Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Rear Registration Plate Lamp",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        // label: {
        //   type: String,
        //   default: "TAC number of Rear Direction Indicator",
        // },
        label: { type: String, default: "TAC No. of Rear Direction Indicator" },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Rear_Direction_Indicator_Bulb_Type: {
    label: { type: String, default: "Rear Direction Indicator Bulb Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Rear Registration Plate Lamp",
        },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC number of Rear Registration Plate Lamp",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Side_Direction_Indicator: {
    label: { type: String, default: "Side Direction Indicator" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of the Side Direction Indicator",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Tac Number of Rear Indicator",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const RetroReflectorsSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Front_White_Reflector: {
    label: { type: String, default: "Front White Reflector" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Front Reflector" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of Front Reflector",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Rear_Red_Reflector: {
    label: { type: String, default: "Rear Red Reflector" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Rear Red Reflector" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of Rear Reflector",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Side_Amber_Reflector: {
    label: { type: String, default: "Side Amber Reflector" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the side amber reflector" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of side amber reflector",
        },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },




  //////////
  Front_Reflective_Tape: {
    label: { type: String, default: "Front Reflective Tape" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Reflective Tape" },
        // display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number of Front Reflective Tape",
        },
        // display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },

  Rear_Reflective_Tape: {
    label: { type: String, default: "Rear Reflective Tape" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Reflective Tape" },
        // display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number",
        },
        // display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },

  Side_Reflective_Tape: {
    label: { type: String, default: "Side Reflective Tape" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Reflective Tape" },
        // display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "TAC Number",
        },
        // display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },

})

const HydraulicBrakeHoseSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Hydraulic_Brake_Hose: {
    label: { type: String, default: "Hydraulic Brake Hose" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Brake Hose" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number and it's Validity" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC VAlidity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const BrakeFluidSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Hydraulic_Brake_Fluid: {
    label: { type: String, default: "Hydraulic Brake Fluid" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Brake Fluid" },
        display: { type: Boolean, default: false },
      },
      Brake_fluid_Test_Report_No: {
        value: { type: String, default: "" },
        label: { type: String, default: "Brake fluid Test Report No" },
      },
    },
  },
})

const SpraySuppressionSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Spray_Suppression_System: {
    label: { type: String, default: "Spray Suppression System" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Spray Suppression / Rear Mud Gaurd",
        },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Test Report No" },        
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
});

const HandleLockSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Protective_Device_Handle_Lock: {
    label: { type: String, default: "Protective Device / Handle Lock" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of Protective Device / Handle Lock",
        },
      },
      Vehicle_category: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle category (IS 14272) " },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Test Report No" },        
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  
});

const RearViewMirrorSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Rear_View_Mirror: {
    label: { type: String, default: "Rear View Mirror" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of the Rear View Mirrors" },
        display: { type: Boolean, default: false },
      },
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number & Its Validity" },
        display: { type: Boolean, default: false },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const WindscreenSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Windscreen: {
    label: { type: String, default: "Windscreen" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Windscreen Make" },
      },
      BIS_License_Number_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "BIS License Number & Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
});

const SideglassSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Side_Glass: {
    label: { type: String, default: "Side Glass" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Side Glass" },
      },
      BIS_License_Number_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "BIS License Number & Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
});

const RearglassSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Rear_Glass: {
    label: { type: String, default: "Rear Glass" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Rear Glass" },
      },
      BIS_License_Number_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "BIS License Number & Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
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
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Wiper Motor" },
      }, 
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number & Its Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },



  Washing_System: {
    label: { type: String, default: "Washing System" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Washing System" },
      },      
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number & Its Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },

  Wiper_Blade: {
    label: { type: String, default: "Wiper Blade" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Wiper Blade" },
      },      
      TAC_Number_Its_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number & Its Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default:
            "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },


  




});

const ReversingLampSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Reversing_Lamp: {
    label: { type: String, default: "Reversing Lamp" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Reverse Lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Reverse Lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
  Reverse_Lamp_Bulb_Type: {
    label: { type: String, default: "Reverse Lamp Bulb Type" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: { type: String, default: "Make of Reverse Lamp" },
        display: { type: Boolean, default: false },
      },
      Category_as_per_AIS_035: {
        value: { type: String, default: "" },
        label: { type: String, default: "Category as per AIS-035" },
        display: { type: Boolean, default: false },
      },
      TAC_Number: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Number of Reverse Lamp" },
        display: { type: Boolean, default: false },
      },
      TAC_Validity: {
        value: { type: String, default: "" },
        label: { type: String, default: "TAC Validity" },
      },
      Possible_date_of_submission_of_required_approval: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Possible date of submission of required approval, if the Certification is in process",
        },
      },
      CoP_Cert_No_with_validity_date: {
        value: { type: String, default: "" },
        label: { type: String, default: "CoP Cert No. with validity date" },
      },
    },
  },
})

const GrabhandleSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  Grab_handle_Straps: {
    label: { type: String, default: "Grab handle / Straps" },
    properties: {
      Make: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Make of the Pillion Hand Hold",
        },
        display: { type: Boolean, default: false },
      },
    },
  },
});

const form8Schema = mongoose.Schema(
  {
    Wheel_Rim: {
      label: { type: String, default: "Wheel Rim" },
      WheelRim: [WheelRimSchema],
    },
    Horn: {
      label: { type: String, default: "Horn" },
      Horn: [HornSchema],
    },
    Tyres: {
      label: { type: String, default: "Tyres" },
      TyresData: [TyresSchema],
    },
    Traction_Battery_Pack: {
      label: { type: String, default: "Traction Battery Pack" },
      TractionBatterypack: [TractionBatterypackSchema],
    },
    Head_Lamp: {
      label: { type: String, default: "Head Lamp" },
      HeadLamp: [HeadLampSchema],
    },
    Daytime_Running_Lamp: {
      label: { type: String, default: "Daytime Running Lamp" },
      DaytimeRunningLamp: [DaytimeRunningLampSchema],
    },
    Position_Lamps: {
      label: { type: String, default: "Position Lamps" },
      PositionLamps: [PositionLampsSchema],
    },
    Rear_Registration_Plate_lamp: {
      label: {
        type: String,
        default: "Rear Registration Plate / Number Plate lamp",
      },
      RearRegistrationPlatelamp: [RearRegistrationPlatelampSchema],
    },
    Direction_Indicator_Lamp: {
      label: {
        type: String,
        default: "Direction Indicator Lamp",
      },
      DirectionIndicatorLamp: [DirectionIndicatorLampSchema],
    },
    Retro_Reflectors: {
      label: {
        type: String,
        default: "Retro Reflectors",
      },
      RetroReflectors: [RetroReflectorsSchema],
    },
    Hydraulic_Brake_Hose: {
      label: {
        type: String,
        default: "Hydraulic Brake Hose",
      },
      HydraulicBrakeHose: [HydraulicBrakeHoseSchema],
    },
    Brake_Fluid: {
      label: {
        type: String,
        default: "Brake Fluid",
      },
      BrakeFluid: [BrakeFluidSchema],
    },
    Spray_Suppression: {
      label: {
        type: String,
        default: "Spray Suppression",
      },
      SpraySuppression: [SpraySuppressionSchema],
    },
    Handle_Lock: {
      label: {
        type: String,
        default: "Handle Lock",
      },
      HandleLock: [HandleLockSchema],
    },
    Rear_View_Mirror: {
      label: {
        type: String,
        default: "Rear View Mirror",
      },
      RearViewMirror: [RearViewMirrorSchema],
    },
    Wind_screen: {
      label: {
        type: String,
        default: "Wind screen",
      },
      Windscreen: [WindscreenSchema],
    },
    Side_glass: {
      label: {
        type: String,
        default: "Side glass",
      },
      Sideglass: [SideglassSchema],
    },
    Rear_glass: {
      label: {
        type: String,
        default: "Rear glass",
      },
      Rearglass: [RearglassSchema],
    },
    Windscreen_wiping: {
      label: {
        type: String,
        default: "Windscreen wiping",
      },
      Windscreenwiping: [WindscreenwipingSchema],
    },
    Reversing_Lamp: {
      label: {
        type: String,
        default: "Reversing Lamp",
      },
      ReversingLamp: [ReversingLampSchema],
    },
    Grab_handle: {
      label: {
        type: String,
        // default: "Grab handle",
        default: "Two Wheeler Aggregates",        
      },
      Grabhandle: [GrabhandleSchema],
    },
    //request ID associated with
    homologationRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomologationRequest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("form8", form8Schema);