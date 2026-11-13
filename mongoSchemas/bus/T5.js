import mongoose from "mongoose";

const t5Schema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
  },
  {
    timestamps: true,
  },
);

/*
 * One T5 document per submission.
 */
t5Schema.index({ submissionId: 1 }, { unique: true });

const T5 = mongoose.model("T5", t5Schema);

export default T5;
