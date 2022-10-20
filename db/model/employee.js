const { DataTypes } = require("sequelize");
const dbClient = require("../index");

const Employee = dbClient.define(
  "Employee",
  {
    em_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    em_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    em_designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    em_salary: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    em_dep_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    em_gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    dbClient,
    modelName: "Employee",
    tableName: "employees",
  }
);
module.exports = Employee;
