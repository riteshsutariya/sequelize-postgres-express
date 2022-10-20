const { DataTypes } = require("sequelize");
const dbClient = require("../index");
const Department = require("./departments");
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
      references: {
        model: Department,
        key: "dep_id",
      },
    },
    em_gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    model: "Employee",
    tableName: "employees",
  }
);
module.exports = Employee;
