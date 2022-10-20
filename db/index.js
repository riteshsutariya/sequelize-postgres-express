const Sequelize = require("sequelize");
const pg = require("pg");
// Data-Base Connection
const connectionOptions = {
  dialect: process.env.DB_DIALECT,
  dialectModule: pg,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: (message) => console.log(message),
};
const dbClient = new Sequelize(connectionOptions);
module.exports = dbClient;
