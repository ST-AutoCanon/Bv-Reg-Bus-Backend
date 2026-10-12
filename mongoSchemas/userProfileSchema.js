const mongoose = require("mongoose")

const userProfileSchema = mongoose.Schema(
  {
    usernumber: {
      type: String,
      required: true,
      unique: true,
    }, 
    username: {
      type: String,
      required: [true, "User must have a username"],
      unique: true,
    },  
    password: {
      type: String,
      required: [true, "User must have a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
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
      enum: ["inactive", "active"],
      default: "inactive",
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

userProfileSchema.pre("validate", async function (next) {
  const doc = this
  const usernumberPrefix = "REG"
  if (doc.isNew) {
    const currentYear = new Date().getFullYear()
    const count = await mongoose.model("UserProfile").estimatedDocumentCount()
    const usernumberValue = count ? `${usernumberPrefix}${currentYear}-${count + 1}` : `${usernumberPrefix}${currentYear}-${1}`
    // console.log(`usernumberValue: ${usernumberValue}`)
    doc.usernumber = usernumberValue
  }
  next()
})

module.exports = mongoose.model("UserProfile", userProfileSchema)
