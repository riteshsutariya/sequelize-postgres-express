const Book = require("./book");
const Department = require("./departments");
const Employee = require("./employee");

Department.belongsTo(Employee, {
  foreignKey: "dep_id",
});
Employee.hasOne(Department, {
  foreignKey: "em_dep_id",
});

module.exports = { Book, Department, Employee };
