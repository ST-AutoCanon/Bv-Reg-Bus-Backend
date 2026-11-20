
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Permanent request number
    requestNumber: {
      type: String,
      trim: true,
      immutable: true,
    },

    // Initial request information
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

    // Entire vehicle form
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
  }
);

// Unique request number for each user
submissionSchema.index(
  { userId: 1, requestNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      requestNumber: { $type: "string" },
    },
  }
);

const Submission = mongoose.model(
  "Submission",
  submissionSchema
);

export default Submission;
