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
    const encodedUser = encodeURIComponent(MONGO_USER);
    const encodedPassword = encodeURIComponent(MONGO_PWD);

    const mongoConnectionURL =
      `mongodb://${encodedUser}:${encodedPassword}@${MONGO_IP}:${MONGO_PORT}/sukalpatechnew1?authSource=admin`;

    mongoose.set("strictQuery", true);

    const mongoConnection = await mongoose.connect(mongoConnectionURL);

    if (mongoConnection) {
      console.log("Connection to MongoDB successful");

      await processDefaultSupplier();
    }

    return mongoConnection;
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error.message);
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




// const mongoose = require("mongoose");
// const { MONGO_URI } = require("../config/config");

// const {
//   getSupplierByKey,
//   createMongoSupplier,
// } = require("./supplierController");

// function defaultSupplierModel() {
//   return {
//     nameOfSupplier: "In House Production",
//     copCertificationNumber: "***",
//     copCertificationValidityDate: "",
//     licenceType: "BIS License No",
//     licenceNumber: "***",
//     licenceValidityDate: "",
//     supplierKey: "vehical_ok_default_supplier",
//   };
// }

// exports.getMongoConnection = async () => {
//   try {
//     if (!MONGO_URI) {
//       throw new Error("MONGO_URI is missing from environment variables");
//     }

//     mongoose.set("strictQuery", true);

//     const mongoConnection = await mongoose.connect(MONGO_URI, {
//       serverSelectionTimeoutMS: 10000,
//     });

//     console.log("Connection to MongoDB Atlas successful");

//     await processDefaultSupplier();

//     return mongoConnection;
//   } catch (error) {
//     console.error(
//       "Error occurred while connecting to MongoDB Atlas:",
//       error.message
//     );

//     throw error;
//   }
// };

// async function processDefaultSupplier() {
//   try {
//     const defaultSupplier = await getSupplierByKey();

//     if (!defaultSupplier) {
//       const supplier = await createMongoSupplier(defaultSupplierModel());

//       if (supplier) {
//         console.log("Default supplier created successfully");
//       } else {
//         console.log("Default supplier could not be created");
//       }
//     } else {
//       console.log("Default supplier already exists");
//     }
//   } catch (error) {
//     console.error(
//       "Error processing default supplier:",
//       error.message
//     );

//     throw error;
//   }
// }
