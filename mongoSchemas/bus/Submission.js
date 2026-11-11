import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    /*
     * Initial request information.
     *
     * This is filled in the popup when the user
     * clicks "New Request".
     */
    requestInfo: {
      vehicleType: {
        type: String,
        required: true,
      },

      fuelType: {
        type: String,
        required: true,
      },

      certificationType: {
        type: String,
        required: true,
      },

      unloadedWeightWithoutBattery: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      preferredTestingAgency: {
        type: String,
        required: true,
      },
    },

    /*
     * One request contains the ENTIRE vehicle form.
     *
     * Example:
     *
     * values: {
     *   manufacturer: {
     *     manufacturerName: "ABC",
     *     modelName: "XYZ",
     *     baseFuelType: "petrol"
     *   },
     *
     *   dimensions: {
     *     overallLength: 5000,
     *     overallWidth: 1800
     *   },
     *
     *   identification: {
     *     vin: ""
     *   }
     * }
     */
    values: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    status: {
      type: String,
      enum: ["draft", "completed"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;