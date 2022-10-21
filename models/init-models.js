var DataTypes = require("sequelize").DataTypes;
var _books = require("./books");
var _departments = require("./departments");
var _employees = require("./employees");

function initModels(sequelize) {
  console.log("init models called");
  var books = _books(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);

  employees.belongsTo(departments, { as: "em_dep", foreignKey: "em_dep_id" });
  departments.hasMany(employees, { as: "employees", foreignKey: "em_dep_id" });

  console.log(books);
  console.log(departments);
  console.log(employees);

  return {
    books,
    departments,
    employees,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
