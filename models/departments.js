const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departments', {
    dep_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dep_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'departments',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "departments_pkey",
        unique: true,
        fields: [
          { name: "dep_id" },
        ]
      },
    ]
  });
};
