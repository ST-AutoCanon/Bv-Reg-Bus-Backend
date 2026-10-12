const mongoose = require("mongoose");

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
      variant: {
        value: { type: String, default: "" },
        label: { type: String, default: "variant(s)" },
      },
      Vehicle_category: {
        value: { type: String, default: "" },
        label: { type: String, default: "Vehicle category (IS 14272) " },
        display: { type: Boolean, default: false },
      },
      Manufacturer_name_and_address: {
        value: { type: String, default: "" },
        label: { type: String, default: "Manufacturer’s name and address" },
        display: { type: Boolean, default: false },
      },
    },
  },
})

const VehicleIdentificationNumberSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },
  VIN_Numbering: {
    label: { type: String, default: "VIN Numbering" },
    properties: {
      Specify_the_Location_of_VIN_on_Chassis: {
        value: { type: String, default: "" },
        label: {
          type: String,
          default: "Specify the Location of VIN on Chassis",
        },
        display: { type: Boolean, default: false },
      },
      Height_of_VIN_characters: {
        value: { type: String, default: "" },
        label: { type: String, default: "Height of VIN characters." },
        display: { type: Boolean, default: false },
      },
      Position_of_the_code_for_month_in_the_Chassis_number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Position of the code for month of production in  the Chassis number" },
      },
      Position_of_the_code_for_year_in_the_Chassis_number: {
        value: { type: String, default: "" },
        label: { type: String, default: "Position of the code for year of production in  the Chassis number" },
      },
      Example_of_Engine_Motor_No: {
        value: { type: String, default: "" },
        label: { type: String, default: "Example of Engine/Motor No" },
      },
      // Example_of_Chassis_No_with_Month_Year_of_Manufacture: {
      //   value: { type: String, default: "" },
      //   label: { type: String, default: "Example of Chassis No. (Vehicle Identification Number) with Month & Year of Manufacture" },
      //   display: { type: Boolean, default: false },
      // },
    },
  },
})

const codeForMonthOfProductionSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
  },

  Month_of_Production: {
    label: { type: String, default: "Code for Month of production" },
    properties: {
      January: {
        value: { type: String, default: "" },
        label: { type: String, default: "January" },
      },
      February: {
        value: { type: String, default: "" },
        label: { type: String, default: "February" },
      },
      March: {
        value: { type: String, default: "" },
        label: { type: String, default: "March" },
      },
      April: {
        value: { type: String, default: "" },
        label: { type: String, default: "April" },
      },
      May: {
        value: { type: String, default: "" },
        label: { type: String, default: "May" },
      },
      June: {
        value: { type: String, default: "" },
        label: { type: String, default: "June" },
      },
      July: {
        value: { type: String, default: "" },
        label: { type: String, default: "July" },
      },
      August: {
        value: { type: String, default: "" },
        label: { type: String, default: "August" },
      },
      September: {
        value: { type: String, default: "" },
        label: { type: String, default: "September" },
      },
      October: {
        value: { type: String, default: "" },
        label: { type: String, default: "October" },
      },
      November: {
        value: { type: String, default: "" },
        label: { type: String, default: "November" },
      },
      December: {
        value: { type: String, default: "" },
        label: { type: String, default: "December" },
      },
    },
  },

  Year_of_Production: {
    label: { type: String, default: "Year of production" },
    properties: {
      firstyear: {
        value: { type: String, default: "" },
        label: { type: String, default: "start year" },
      },      
      
    },
  },

  Code_for_Year: {
    label: { type: String, default: "Code For Year" },
    properties: {      
      firstYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "1st year Code" },
      },
      secondYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "2nd year Code" },
      },
      thirdYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "3rd year Code" },
      },
      fourthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "4th year Code" },
      },
      fifthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "5th year Code" },
      },
      sixthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "6th year Code" },
      },
      seventhYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "7th year Code" },
      },
      eighthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "8th year Code" },
      },
      ninthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "9th year Code" },
      },
      tenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "10th year Code" },
      },
      eleventhYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "11th year Code" },
      },
      twelfthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "12th year Code" },
      },
      thirteenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "13th year Code" },
      },
      fourteenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "14th year Code" },
      },
      fifteenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "15th year Code" },
      },
      sixteenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "16th year Code" },
      },
      seventeenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "17th year Code" },
      },
      eighteenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "18th year Code" },
      },
      nineteenthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "19th year Code" },
      },
      twentiethYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "20th year Code" },
      },
      twentyFirstYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "21st year Code" },
      },
      twentySecondYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "22nd year Code" },
      },
      twentyThirdYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "23rd year Code" },
      },
      twentyFourthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "24th year Code" },
      },
      twentyFifthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "25th year Code" },
      },
      twentySixthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "26th year Code" },
      },
      twentySeventhYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "27th year Code" },
      },
      twentyEighthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "28th year Code" },
      },
      twentyNinthYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "29th year Code" },
      },
      thirtiethYearCode: {
        value: { type: String, default: "" },
        label: { type: String, default: "30th year Code" },
      },
    }
  },
  


  chassis_Number: {
  label: { type: String, default: "Chassis Number" },
  properties: {
    WMI_Code: {
      value: { type: String, default: "" },
      label: { type: String, default: "WMI Code" },
    },
    
   
    wmi_extension_code: {
      value: { type: String, default: "" },
      label: { type: String, default: "WMI Extension Code" },
    },
    serial_number: {
      value: { type: String, default: "" },
      label: { type: String, default: "Serial Number" },
    },


  }
},


vds_Sequence: {
  label: { type: String, default: "vds Sequence" },
  properties: {
    sequence_fourth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Sequence Number 4th" },
    },
    VDS_fourth: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS 4th" },
    },
    VDS_fourth_type: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS type 4th" },
    },
    VDS_value_fourth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Value 4th" },
    },
    sequence_fifth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Sequence Number 5th" },
    },
    VDS_fifth: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS 5th" },
    },
    VDS_fifth_type: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS type 5th" },
    },
    VDS_value_fifth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Value 5th" },
    },
    sequence_sixth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Sequence Number 6th" },
    },
    VDS_sixth: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS 6th" },
    },
    VDS_sixth_type: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS type 6th" },
    },
    VDS_value_sixth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Value 6th" },
    },
    sequence_seventh: {
      value: { type: String, default: "" },
      label: { type: String, default: "Sequence Number 7th" },
    },
    VDS_seventh: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS 7th" },
    },
    VDS_seventh_type: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS type 7th" },
    },
    VDS_value_seventh: {
      value: { type: String, default: "" },
      label: { type: String, default: "Value 7th" },
    },
    sequence_eighth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Sequence Number 8th" },
    },
    VDS_eighth: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS 8th" },
    },
    VDS_eighth_type: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS type 8th" },
    },
    VDS_value_eighth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Value 8th" },
    },
    sequence_ninth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Sequence Number 9th" },
    },
    VDS_ninth: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS 9th" },
    },
    VDS_ninth_type: {
      value: { type: String, default: "" },
      label: { type: String, default: "VDS type 9th" },
    },
    VDS_value_ninth: {
      value: { type: String, default: "" },
      label: { type: String, default: "Value 9th" },
    },
///
sequence_tenth: {
  value: { type: String, default: "" },
  label: { type: String, default: "Sequence Number 10th" },
},
VDS_tenth: {
  value: { type: String, default: "" },
  label: { type: String, default: "VDS 10th" },
},
VDS_tenth_type: {
  value: { type: String, default: "" },
  label: { type: String, default: "VDS type 10th" },
},
VDS_value_tenth: {
  value: { type: String, default: "" },
  label: { type: String, default: "Value 10th" },
},
///
sequence_eleventh: {
  value: { type: String, default: "" },
  label: { type: String, default: "Sequence Number 11th" },
},
VDS_eleventh: {
  value: { type: String, default: "" },
  label: { type: String, default: "VDS 11th" },
},
VDS_eleventh_type: {
  value: { type: String, default: "" },
  label: { type: String, default: "VDS type 11th" },
},
VDS_value_eleventh: {
  value: { type: String, default: "" },
  label: { type: String, default: "Value 11th" },
},
  },
},
 
})


const form11Schema = mongoose.Schema(
  {
    Vehicle_General_Information: {
      label: { type: String, default: "Vehicle General Information" },
      vehicleGeneralInformation: [vehicleGeneralInformationSchema],
    },
    Vehicle_Identification_Number: {
      label: { type: String, default: "Vehicle Identification Number" },
      VehicleIdentificationNumber: [VehicleIdentificationNumberSchema],
    },
    Month_of_Production: {
      label: { type: String, default: "Code for Month and Year of production" },
      codeForMonthOfProduction: [codeForMonthOfProductionSchema],
    },
    homologationRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomologationRequest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("form11", form11Schema);
