
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
    _id: String,
    seq: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

const Counter =
  mongoose.models.SubmissionCounter ||
  mongoose.model("SubmissionCounter", counterSchema);

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    requestNumber: {
      type: String,
      trim: true,
      immutable: true,
    },

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

    // Uploaded vehicle image path
    vehicleImage: {
      type: String,
      default: "",
    },

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

// Generate a request number if one is not already assigned


  

submissionSchema.pre("save", async function () {
  if (!this.isNew || this.requestNumber) return;

  const year = new Date().getFullYear();

  // Separate counter for each user and year
  const counterId = `BUS-${year}-${this.userId}`;

  // Find the highest existing request number for this user
  const latestSubmission = await this.constructor
    .findOne({
      userId: this.userId,
      requestNumber: {
        $regex: `^BUS-${year}-\\d+$`,
      },
    })
    .sort({ requestNumber: -1 })
    .select("requestNumber")
    .lean();

  let latestNumber = 0;

  if (latestSubmission?.requestNumber) {
    const match = latestSubmission.requestNumber.match(/(\d+)$/);

    if (match) {
      latestNumber = Number(match[1]);
    }
  }

  // Bring this user's counter up to their highest existing number
  await Counter.updateOne(
    { _id: counterId },
    { $max: { seq: latestNumber } },
    { upsert: true }
  );

  // Generate the next number for this user
  const counter = await Counter.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    {
      new: true,
      upsert: true,
    }
  );

  this.requestNumber =
    `BUS-${year}-${String(counter.seq).padStart(3, "0")}`;
});


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

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
