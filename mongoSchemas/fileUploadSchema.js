const mongoose = require("mongoose");

const form1AData = mongoose.Schema({
    General_arrangement_vehicle: {
        label: { type: String, default: "Arrangement of the vehicle" },
        properties: {
            Upload_Drawing_Vehicle: {
                label: { type: String, default: "Photos and/or drawings of a typical vehicle" },
                file_name: { type: String, default: "" },
            },
            Upload_Drawing_complete_Vehicle: {
                label: { type: String, default: "Drawing of the complete Vehicle indicating overall length, width and height." },
                file_name: { type: String, default: "" },
            },
        }
    },
    Transmission: {
        label: { type: String, default: "Transmission(8)" },
        properties: {
            Drawing_transmission_arrangement: {
                label: { type: String, default: "Diagram of transmission system (Contains Belt drive or Chain drive)" },
                file_name: { type: String, default: "" },
            }
        }
    },
    InstrumentClusterSchema: {
        label: { type: String, default: "Speedometer" },
        properties: {
            Drawing_showing_the_Complete_Instrument_Cluster: {
                label: { type: String, default: "Photographs and/or drawings of the complete system" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Suspension: {
        label: { type: String, default: "Suspension" },
        properties: {
            Upload_Drawing_Suspension: {
                label: { type: String, default: "Drawing of suspension arrangement" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Brief_Brake_Information: {
        label: { type: String, default: "Braking" },
        properties: {
            Drawing_Braking_System: {
                label: { type: String, default: "Drawing of braking devices (Schematic Layout of Braking System)" },
                file_name: { type: String, default: "" },
            }
        }
    },
    ABS: {
        label: { type: String, default: "Sensors (Make )(front/Rear)" },
        properties: {
            ID_SensorsHydraulic_Reservoir: {
                label: { type: String, default: "Identification number(ID) / Part No./Drawing no.)" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Make_of_modulator: {
        label: { type: String, default: "Make of modulator (front/Rear)" },
        properties: {
            ID_Modulator_Each_wheel: {
                label: { type: String, default: "Identification number(ID) / Part No./Drawing no.)" },
                file_name: { type: String, default: "" },
            },
            Drawing_parking_brake_and_mechanism: {
                label: { type: String, default: "Other devices (parking brake, etc.) (where applicable): drawing and description" },
                file_name: { type: String, default: "" },
            },
        }
    },
    Side_Hazard_Lamp: {
        label: { type: String, default: "Lighting and light-signalling devices" },
        properties: {
            Diagram_location_lighting: {
                label: { type: String, default: "Diagram showing the location of the lighting and light-signaling devices on vehicle with relevant dimensions (see AIS-009)" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Coupling_devices: {
        label: { type: String, default: "Coupling devices (where applicable)" },
        properties: {
            Diagram_location_lighting: {
                label: { type: String, default: "Photograph and/or drawings showing the position and construction of the coupling devices." },
                file_name: { type: String, default: "" },
            }
        }
    },
    VINNumbering: {
        label: { type: String, default: "Statutory inscriptions" },
        properties: {
            Photo_location_VIN: {
                label: { type: String, default: "Photographs and/or drawings showing the location of VIN." },
                file_name: { type: String, default: "" },
            }
        }
    },
    Horn: {
        label: { type: String, default: "Audible warning device(s)" },
        properties: {
            Drawing_showing_location: {
                label: { type: String, default: "Drawing(s) showing the location of the audible warning device(s) in relation to the structure of the vehicle" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Rear_View_Mirror: {
        label: { type: String, default: "Rear-view mirrors" },
        properties: {
            Drawing_Installation_Dimension: {
                label: { type: String, default: "Drawing(s) showing the location & Installation Dimension Details of the rear-view mirror(s) in relation to the structure of the vehicle" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Grab_handle_Straps: {
        label: { type: String, default: "Nos of Handholds for pillion Rider in  case of 2 Wheeler" },
        properties: {
            Drawing_handhold_Strap: {
                label: { type: String, default: "Drawings showing dimensional and material details od strap / handhold(s) and its fixing / bolting details" },
                file_name: { type: String, default: "" },
            }
        }
    },
    strap_and_HandelHold: {
        label: { type: String, default: "Strap and hand hold" },
        properties: {
            Drawing_handhold_Strap: {
                label: { type: String, default: "Drawings showing dimensional and material details of strap / handhold(s) and its fixing / bolting details" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Grab_handle_Straps_3_wheeler: {
        label: { type: String, default: "Nos of Handholds for passenger(s) in  case of 3 Wheeler" },
        properties: {
            Drawing_handhold_Strap: {
                label: { type: String, default: "Protective devices covering half of the rear  wheel.(as applicable) along with schematic drawing" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Spray_Suppression_Rear_Mud_Gaurd: {
        label: { type: String, default: "Spray suppression device (as applicable)" },
        properties: {
            Diagram_spray_suppression: {
                label: { type: String, default: "Diagram showing general arrangement of spray suppression system, Angle θ and relevant dimensions as specified in AIS-103 :2009" },
                file_name: { type: String, default: "" },
            }
        }
    },
    Two_Wheeler_Stand: {
        label: { type: String, default: "Type of stand (Centre/Prop/both)" },
        properties: {
            Diagram_Stands_installation: {
                label: { type: String, default: 
                    "Drawing related to the stand installation showing minimum details given in info image"
                },
                file_name: { type: String, default: "" },
            },
            Drawing_Footrest_Floor_Boards: {
                label: { type: String, default: "Photographs or drawings showing the location and the construction of Foot rests." },
                file_name: { type: String, default: "" },
            },
        }
    },
    Fire_Fighting_System: {
        label: { type: String, default: "Firefighting System (if fitted)" },
        properties: {
            Photo_fire_fighting_system: {
                label: { type: String, default: "Photograph of vehicle with firefighting system" },
                file_name: { type: String, default: "" },
            },
        }
    },
    Dimensions_and_weights: {
        label: { type: String, default: "Dimensions and weights (in mm and kg) (where necessary, refer to drawings)	" },
        properties: {
            Dimensions_to_be_complied: {
                label: { type: String, default: "Dimensions to be complied with when building un-bodied chassis" },
                file_name: { type: String, default: "" },
            },
        }
    },
    Windscreen_and_Wiping_System: {
        label: { type: String, default: "Windscreen wiper(s)" },
        properties: {
            Upload_Drawing: {
                label: { type: String, default: 
                    "Detailed technical description Layout including location of R Point, H Point and related dimensions of wiping area and related dimensions of wiper arm(s) and co-ordinates of mounting (see AIS-045)" },
                file_name: { type: String, default: "" },
            },
        }
    },

    R_Point: {
        label: { type: String, default: "Seats" },
        properties: {
            Coordinates_of_drawing: {
                label: { type: String, default: 
                    `Coordinates or drawing of the R point declared by manufacturer` },
                file_name: { type: String, default: "" },
            },
            General_layout: {
                label: { type: String, default: 
                    `General layout of the door structure for passenger compartment with a dimension of door top edge from adjacent passenger seat cushion top surface.` },
                file_name: { type: String, default: "" },
            },
        }
    },

    Rear: {
        label: { type: String, default: "Rear" },
        properties: {
            Coordinates_of_drawing: {
                label: { type: String, default: 
                    `Dimensional Drawing indicating installation details of reflective Tapes at front, Rear & side of the vehicle / load body / container / Tanker etc., as per AIS-090.` },
                file_name: { type: String, default: "" },
            },
        }
    },
    Device_to_protect_against_unauthorized_use: {
        label: { type: String, default: "Device(s) to protect against unauthorized use" },
        properties: {
            Drawing_showing_installation: {
                label: { type: String, default: 
                    `Drawing showing installation details of the protective device(s) against unauthorized use` },
                file_name: { type: String, default: "" },
            },
        }
    },
});


const form7Data = mongoose.Schema({
    Body_Overhang: {
        label: { type: String, default: "Seating" },
        properties: {
            Upload_drawing_showing_the_seating_layout_of_the_vehicle: {
                label: { type: String, default: `Sketch showing seating layout with vehicle dimensions (mm)
                (All category of vehicles)` },
                file_name: { type: String, default: "" },
            },
        }
    },
});

const form11Data = mongoose.Schema({
    diagrams: {
        label: { type: String, default: "Diagrams" },
        properties: {
            Upload_drawing1: {
                label: { type: String, default: `Place of Embossing or etching the Chassis Number (Vehicle Identification Number). Supporting details by drawing or pictures may be provided if necessary.` },
                file_name: { type: String, default: "" },
            },
            Upload_drawing2: {
                label: { type: String, default: `Place of VIN Verification plate. Supporting details by drawing or pictures may be provided if necessary.` },
                file_name: { type: String, default: "" },
            },
            Upload_drawing3: {
                label: { type: String, default: `Place of Local information (Importer Plate)- if machine imported. Supporting details by drawing or pictures may be provided if necessary` },
                file_name: { type: String, default: "" },
            },
        }
    },
});

const form13Data = mongoose.Schema({
    General_description_of_vehicle: {
        label: { type: String, default: "General description of vehicle" },
        properties: {
            upload_drawing_showing_Different_views_of_the_vehicle: {
                label: { type: String, default: `Drawing and /or Photographs of the vehicle` },
                file_name: { type: String, default: "" },
            },
        }
    },
    Traction_Battery_Pack: {
        label: { type: String, default: "Provision of ventilation for battery Yes / No" },
        properties: {
            Brief_description_of_the_battery_pack_ventilation: {
                label: { type: String, default: `Brief description of the battery pack ventilation system adopted in the vehicle. Provide drawing if necessary.` },
                file_name: { type: String, default: "" },
            },
        }
    },
    Traction_Motor: {
        label: { type: String, default: "Description of The Drivetrain" },
        properties: {
            Motor_power_curve: {
                label: { type: String, default: `Motor power curve (kW) with motor RPM (min-1) / vehicle speed in (km/h), (Provide Graph).` },
                file_name: { type: String, default: "" },
            },
        }
    },
    Cooling_System: {
        label: { type: String, default: "Liquid cooling equipment characteristics" },
        properties: {
            Radiator_drawing_or_make_and_type: {
                label: { type: String, default: `Radiator : drawing(s) or make(s) and type(s)` },
                file_name: { type: String, default: "" },
            },
        }
    },
    Charger: {
        label: { type: String, default: "Charger" },
        properties: {
            Normal_Charging_Profile: {
                label: { type: String, default: `Description of the normal profile of charging system` },
                file_name: { type: String, default: "" },
            },
        }
    },

    Electrical_details_of_vehicle: {
        label: { type: String, default: "Electrical details of vehicle for functional safety" },
        properties: {
            Upload_Schematic_Drawing: {
                label: { type: String, default: `Schematic diagram showing the electrical layout giving all major electrical items along with their physical location in the vehicle. It shall include batteries, power-train components, protection fuses, circuit breakers etc.` },
                file_name: { type: String, default: "" },
            },
            Schematic_highlighting: {
                label: { type: String, default: `Schematic highlighting physical location of live parts having working voltage greater than 60 V DC or 25 V AC.` },
                file_name: { type: String, default: "" },
            },
            List_of_exposed_conductive: {
                label: { type: String, default: `List of exposed conductive parts of on-board equipment.` },
                file_name: { type: String, default: "" },
            },
        }
    },
});

const footerData = mongoose.Schema({
    SealSign: {
        label: { type: String, default: "SealSign" },
        properties: {          
            Upload_Seal: {
                label: { type: String, default: `Upload Seal / Signature` },
                file_name: { type: String, default: "" },
                value: { type: String, default: "" },
            },
        }
    },
    footer: {
        label: { type: String, default: "Footer" },
        properties: {
            Homologation_Engineer_Name: {
                label: { type: String, default: `Homologation Engineer Name` },
                value: { type: String, default: "" },
            },
            Engineer_Designation: {
                label: { type: String, default: `Engineer Designation` },
                value: { type: String, default: "" },
            },
            Manufacture_Name: {
                label: { type: String, default: `Manufacture Name` },
                value: { type: String, default: "" },
            },
            Document_No: {
                label: { type: String, default: `Document No` },
                value: { type: String, default: "" },
            },
         
        }
    }
});


const fileUploadSchema = mongoose.Schema(
  {
    form1AData: form1AData,
    form7Data: form7Data,
    form11Data: form11Data,
    form13Data: form13Data,  
    footerData: footerData,
    
    homologationRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HomologationRequest",
      },
  },
  { timestamps: true }
)

module.exports = mongoose.model("fileUploadSchema", fileUploadSchema);




// display: { type: Boolean, default: false },