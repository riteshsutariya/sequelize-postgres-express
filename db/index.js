const Sequelize = require("sequelize");
const initModels = require("./model/init-models");
// Data-Base Connection
const connectionOptions = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: (message) => console.log(message),
};

//1. passing connection uri:
const sequelize1 = new Sequelize("postgres://localhost:5432/test");

//2. passing parameters seprately
const sequelize2 = new Sequelize({
  dialect: "postgres",
  storage: "postgres://localhost:5432",
});
//3. passing parametere seprately(other dialects)
const dbClient = new Sequelize(connectionOptions);

// initModels(dbClient);

module.exports = dbClient;
