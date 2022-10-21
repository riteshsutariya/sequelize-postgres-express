const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employees', {
    em_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    em_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    em_salary: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    em_designation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    em_dep_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'dep_id'
      }
    },
    em_gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employees',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employees_pkey",
        unique: true,
        fields: [
          { name: "em_id" },
        ]
      },
    ]
  });
};
