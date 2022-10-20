const { DataTypes } = require("sequelize");
const dbClient = require("../index");

const Department = dbClient.define(
  "Department",
  {
    dep_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dep_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "Department",
    tableName: "departments",
  }
);
module.exports = Department;
