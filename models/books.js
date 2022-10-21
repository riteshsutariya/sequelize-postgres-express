const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    bk_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bk_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bk_auther: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bk_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bk_publisher: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bk_description: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "books_pkey",
        unique: true,
        fields: [
          { name: "bk_id" },
        ]
      },
    ]
  });
};
