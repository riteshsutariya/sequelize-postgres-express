const { Sequelize, DataTypes, Model } = require("sequelize");
const dbClient = require("../index");
/*
const Book = database.define(
  "Book",
  {
    bk_id: { type: DataTypes.INTEGER, allowNull: false },
    bk_name: { type: DataTypes.STRING, allowNull: false },
    bk_auther: { type: DataTypes.STRING, allowNull: false },
    bk_price: { type: DataTypes.INTEGER, allowNull: false },
    bk_publisher: { type: DataTypes.STRING, allowNull: false },
    bk_descrition: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "Books",
  }
);*/

// class Book extends Model {
//   static initModel(sequelize) {
//     Book.init(
//       {
//         bk_id: { type: DataTypes.INTEGER, allowNull: false },
//         bk_name: { type: DataTypes.STRING, allowNull: false },
//         bk_auther: { type: DataTypes.STRING, allowNull: false },
//         bk_price: { type: DataTypes.INTEGER, allowNull: false },
//         bk_publisher: { type: DataTypes.STRING, allowNull: false },
//         bk_descrition: { type: DataTypes.STRING, allowNull: false },
//       },
//       {
//         sequelize,
//         tableName: "books",
//         schema: "public",
//         timestamps: false,
//       }
//     );
//   }
// }

const Book = dbClient.define(
  "Book",
  {
    bk_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    bk_name: { type: DataTypes.STRING, allowNull: false },
    bk_auther: { type: DataTypes.STRING, allowNull: false },
    bk_price: { type: DataTypes.INTEGER, allowNull: false },
    bk_publisher: { type: DataTypes.STRING, allowNull: false },
    bk_description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    dbClient,
    modelName: "Book",
    tableName: "books",
  }
);

// class Book extends Model {
//   static associate(models) {
//     //define associate here
//   }
//   static initModel(sequelize) {
//     return Book.init(
//       {
//         bk_id: {
//           type: DataTypes.INTEGER,
//           allowNull: false,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         bk_name: { type: DataTypes.STRING, allowNull: false },
//         bk_auther: { type: DataTypes.STRING, allowNull: false },
//         bk_price: { type: DataTypes.INTEGER, allowNull: false },
//         bk_publisher: { type: DataTypes.STRING, allowNull: false },
//         bk_descrition: { type: DataTypes.STRING, allowNull: false },
//       },
//       {
//         sequelize,
//         modelName: "Book",
//       }
//     );
//   }
// }

module.exports = Book;
