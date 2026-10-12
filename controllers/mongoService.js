const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PWD,
  MONGO_IP,
  MONGO_PORT,
} = require("../config/config");

const {getSupplierByKey, createMongoSupplier} = require('./supplierController')

function defaultSupplierModel(){
  return {
    nameOfSupplier: "In House Production",
    copCertificationNumber: "***",
    copCertificationValidityDate: "",
    // copCertificationValidityDate: "02-11-2022",
    licenceType: "BIS License No",
    licenceNumber: "***",
    licenceValidityDate: "",
    // licenceValidityDate: "24 June 2023",
    supplierKey: "vehical_ok_default_supplier"
  }
}

exports.getMongoConnection = async () => {
  try {
    const mongoConnectionURL =`mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_IP}:${MONGO_PORT}/sukalpatechnew?authSource=admin`;
    mongoose.set("strictQuery", true)
    const mongoConnection = await mongoose.connect(`${mongoConnectionURL}`)
    if (mongoConnection){
      console.log(`connection to mongodb successful`)

      await processDefaultSupplier();
    }
    return mongoConnection
  } catch (error) {
    console.error(`Error occured while connecting to mongo DB: ${error}`);
  }
};

async function processDefaultSupplier() {
  try {
    // console.log(`fetching default supplier before attempting to create one`);
    const defaultSupplier = await getSupplierByKey();
    if (!defaultSupplier) {
      // console.log(`creating default supplier`);
      const supplier = await createMongoSupplier(defaultSupplierModel());
      if (supplier) {
        // console.log(`created default supplier: ${JSON.stringify(supplier)}`);
      } else{
        // console.log(`default supplier was not created: ${JSON.stringify(supplier)}`);
      }
    } else {
      // console.log(`default supplier found: ${JSON.stringify(defaultSupplier)}`);
    }
  } catch (error) {
    // console.log(`exception occured: ${error}`);
  }
}