const bcrypt = require("bcrypt")
const UserProfile = require("../mongoSchemas/userProfileSchema")
const { sendUserRegistrationMail,sendForgotPasswordMail } = require("./sendgridEmailService")

exports.createUserProfile = async (userRegistrationReq) => {
  const userProfile = await UserProfile.find({ username: userRegistrationReq.emailId })
  if (!userProfile) {
    throw new Error(`userProfile already exists with username: ${userRegistrationReq.emailId}`)
  }
  const tempPassword = generateRandomString(10)
  const hashedPassword = await bcrypt.hash(tempPassword, 10)
  const userProfilePayload = {
    username: userRegistrationReq.emailId,
    password: hashedPassword,
    firstName: userRegistrationReq.firstName,
    lastName: userRegistrationReq.lastName,
    emailId: userRegistrationReq.emailId,
    typeOfBusiness: userRegistrationReq.typeOfBusiness,
    businessName: userRegistrationReq.businessName,
    registrationDate: userRegistrationReq.registrationDate,
    registrationNumber: userRegistrationReq.registrationNumber,
    vehicleType: userRegistrationReq.vehicleType,
    businessDescription: userRegistrationReq.businessDescription,
    profileAddress: {
      address1: userRegistrationReq.profileAddress.address1,
      address2: userRegistrationReq.profileAddress.address2,
      country: userRegistrationReq.profileAddress.country,
      state: userRegistrationReq.profileAddress.state,
      city: userRegistrationReq.profileAddress.city,
      zipCode: userRegistrationReq.profileAddress.zipCode,
      contact: userRegistrationReq.profileAddress.contact,
      alternateContact: userRegistrationReq.profileAddress.alternateContact,
    },
  }
  // console.log(`creating a new user profile: ${JSON.stringify(userProfilePayload)}`)
  const newUserProfile = await UserProfile.create(userProfilePayload)
  if(newUserProfile != null) {
    const { username, emailId} = newUserProfile
    sendUserRegistrationMail(emailId, username, tempPassword)
  }
  return newUserProfile;
}

exports.forgotPassword = async (user) => {
  const tempPassword = generateRandomString(10)
  const hashedPassword = await bcrypt.hash(tempPassword, 10)
  const userUpdated = await UserProfile.findByIdAndUpdate(user._id, { password: hashedPassword, status: "inactive" })
    if(userUpdated != null) {
      const { username, emailId} = userUpdated
      sendForgotPasswordMail(emailId, username, tempPassword)
    }
}

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let randomString = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }
  return randomString
}