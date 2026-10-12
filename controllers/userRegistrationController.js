const UserRegistration = require("../mongoSchemas/userRegistrationSchema")
const { createUserProfile } = require("../services/userProfileService")

exports.newUserRegistration = async (req, res, next) => {
  try {
    const request = req.body
    if (!request) {
      throw new Error(`request body not provided`)
    }
    const userRegistrationPayload = {
      firstName: request.firstName,
      lastName: request.lastName,
      emailId: request.emailId,
      typeOfBusiness: request.typeOfBusiness,
      businessName: request.businessName,
      registrationDate: request.registrationDate,
      registrationNumber: request.registrationNumber,
      vehicleType: request.vehicleType,
      businessDescription: request.businessDescription,
      profileAddress: {
        address1: request.profileAddress.address1,
        address2: request.profileAddress.address2,
        country: request.profileAddress.country,
        state: request.profileAddress.state,
        city: request.profileAddress.city,
        zipCode: request.profileAddress.zipCode,
        contact: request.profileAddress.contact,
        alternateContact: request.profileAddress.alternateContact,
      },
    }
    // console.log(`creating a new user registration request: ${JSON.stringify(userRegistrationPayload)}`)
    const newRegistration = await UserRegistration.create(userRegistrationPayload)
    if (newRegistration != null) {
      res.status(201).json({
        status: "success",
        body: `new user registration request is created: ${newRegistration}`,
      })
    } else {
      res.status(200).json({
        status: "failure",
        body: `error while creating new registration`,
      })
    }
  } catch (error) {
    // console.log(`error while creating new registration: ${error}`)
    res.status(200).json({
      status: "failure",
      body: `error while creating new registration: ${error}`,
    })
  }
}

exports.searchUserRegistrations = async (req, res, next) => {
  try {
    const request = req.body
    if (!request.startDate || !request.endDate || !request.status) {
      throw new Error(
        `request does not contain required parameters: startDate: ${request.startDate}, endDate: ${request.endDate}, status: ${request.status}`
      )
    }
    const startDate = new Date(Date.parse(request.startDate))
    const endDate = new Date(Date.parse(request.endDate)).setHours(23, 59, 59, 999)
    const queryPayload = {
      createdAt: { $gte: startDate, $lte: endDate },
      status: request.status,
    }
    // console.log(`queryPayload: ${JSON.stringify(queryPayload)}`)
    const userRegistrationCollection = await UserRegistration.find(queryPayload).sort({ createdAt: "asc" })
    res.status(200).json({
      status: "success",
      body: userRegistrationCollection,
    })
  } catch (error) {
    // console.log(`error while searching for registration requests: ${error}`)
    res.status(200).json({
      status: "failure",
      body: `error while searching for registration requests: ${error}`,
    })
  }
}

exports.processUserRegistration = async (req, res, next) => {
  try {
  const userRegistrationId = req.params.userRegistrationId
  const status = req.params.status
  if (!userRegistrationId || !status) {
    throw new Error(`request does not contain required parameters: userRegistrationId: ${userRegistrationId}, status: ${status}`)
  }
  if (status === "rejected") {
    // console.log(`updating userRegistration request: ${userRegistrationId} to "${status}" status`)
    const updatedReq = await UserRegistration.findByIdAndUpdate(userRegistrationId, { status }, { returnDocument: "after" })
    // console.log(`userRegistration request: ${userRegistrationId} request updated to "${status}" status`)
    res.status(200).json({
      status: "success",
      body: `userRegistration request: ${userRegistrationId} request updated to "${status}" status`,
    })
  }
  else if (status === "approved"){
    // console.log(`updating userRegistration request: ${userRegistrationId} to "${status}" status`)
    const updatedReq = await UserRegistration.findByIdAndUpdate(userRegistrationId, { status }, { returnDocument: "after" })
    // console.log(`userRegistration request: ${userRegistrationId} request updated to "${status}" status`)

    const newUserProfile = await createUserProfile(updatedReq)
    if(newUserProfile != null){
      // console.log(`new user profile with username: ${newUserProfile.username} created`)
      res.status(201).json({
        status: "success",
        body: `new user profile with username: ${newUserProfile.username} created`,
      })
    }
  }

  } catch (error) {
    // console.log(`error while searching for registration requests: ${error}`)
    res.status(200).json({
      status: "failure",
      body: `error while searching for registration requests: ${error}`,
    })
  }
}