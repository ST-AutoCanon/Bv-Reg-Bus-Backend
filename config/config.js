// module.exports = {
//   MONGO_IP: '69.164.253.48',
//   MONGO_USER: "testsukalpa",
//   MONGO_PWD: "Sukalpa#123",
//   MONGO_PORT: 27017
// };


require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
};