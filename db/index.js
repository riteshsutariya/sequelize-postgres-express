const Sequelize = require("sequelize");
// Data-Base Connection
const connectionOptions = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: (message) => console.log(message),
};
//passing parametere seprately(other dialects)
const dbClient = new Sequelize(connectionOptions);

// initModels(dbClient);
module.exports = dbClient;
