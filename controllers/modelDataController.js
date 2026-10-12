const homologationRequestComponentsDataModel = require("../models/homologationRequestComponentsDataModel.json");

exports.homologationRequestComponents = async (req, res, next) => {
  try {
    const reqBody = req.body;
    if (!reqBody.vehicle_type || !reqBody.fuel_type) {
      throw new Error(`request body doesnt contain valid data: ${JSON.stringify(reqBody)}`);
    }
    const model = homologationRequestComponentsDataModel.filter(
      (requestToComponent) =>
        requestToComponent.vehicle_type === reqBody.vehicle_type &&
        requestToComponent.fuel_type === reqBody.fuel_type
    );
    if (model) {
      res.status(200).json(model);
    } else {
      throw new Error(`request body doesnt match homologationRequestComponentsDataModel data: ${JSON.stringify(reqBody)}`);
    }
  } catch (error) {
    console.error(`exception occured: ${error}`);
    res.status(400).json({
      status: "failure",
      body: `exception occured: ${error}`,
    });
  }
};