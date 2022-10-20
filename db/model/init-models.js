const book = require("./book");
let Book;
const initModels = (sequelize) => {
  Book = book.initModel(sequelize);
};

module.exports = Book;
