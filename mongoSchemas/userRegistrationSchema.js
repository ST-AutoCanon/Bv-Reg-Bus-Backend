const mongoose = require("mongoose")

const userRegistrationSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "User must have a firstName"],
    },
    lastName: {
      type: String,
      required: [true, "User must have a lastName"],
    },
    emailId: {
      type: String,
      required: [true, "User must have a emailId"],
      unique: true,
    },
    typeOfBusiness: {
      type: String,
      required: [true, "User must have a typeOfBusiness"],
    },
    businessName: {
      type: String,
      required: [true, "User must have a businessName"],
    },
    registrationDate: {
      type: Date,
      required: [true, "User must have a registrationDate"],
    },
    registrationNumber: {
      type: String,
      required: [true, "User must have a registrationNumber"],
    },
    vehicleType: {
      type: String,
      required: [true, "User must have a VehicleType"],
    },
    businessDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: ["incomplete", "approved", "rejected"],
      default: "incomplete",
    },
    profileAddress: {
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      country: {
        type: String,
        required: [true, "User must have a country"],
      },
      state: {
        type: String,
        required: [true, "User must have a state"],
      },
      city: {
        type: String,
        required: [true, "User must have a city"],
      },
      zipCode: {
        type: String,
        required: [true, "User must have a zipCode"],
      },
      contact: {
        type: String,
        required: [true, "User must have a contact"],
      },
      alternateContact: {
        type: String,
        required: [true, "User must have a alternateContact"],
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("UserRegistration", userRegistrationSchema);