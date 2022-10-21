const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const pg = require("pg");
// Data-Base Connection
const connectionOptions = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: (message) => console.log(message),
};
const dbClient = new Sequelize(connectionOptions);

const models = initModels(dbClient);
// try {
//   dbClient.sync({
//     // force: true,
//     sync: true,
//   });
// } catch (error) {
//   console.log("error: ", error);
//   process.exit(1);
// }
module.exports = { dbClient, models };
