const express = require("express");
const app = express.Router();
// const books = require("../data/books");
const Book = require("../db/model/book");
const dbClient = require("../db/index");
//get all books
app.get("/", async (req, res) => {
  try {
    let books = await Book.findAll({ order: [["bk_id", "ASC"]] });
    console.log("books data: ", books.length);
    if (books.length > 0) {
      return res.status(200).json({
        status: true,
        response: {
          data: books,
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        response: {
          message: "No books found!",
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(502).json({
      status: false,
      response: {
        message: "Intenal Server Error!",
      },
    });
  }
});

//get book by id
app.get("/:bk_id", async (req, res) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let id = parseInt(req.params.bk_id);
  if (id) {
    let result = await Book.findOne({
      where: {
        bk_id: id,
      },
    });
    console.log("result: ", result);
    if (result) {
      res.status(200).json({
        status: true,
        response: {
          data: result,
        },
      });
    } else {
      res.status(404).json({
        status: false,
        response: {
          message: "book not found with provided id!",
        },
      });
    }
  } else {
    res.status(304).json({
      status: false,
      message: "please provide book id!",
    });
  }
});

//insert book
app.post("/", async (req, res) => {
  const newBook = req.body;
  const transaction = await dbClient.transaction();
  try {
    const book = await Book.create(newBook, { transaction });
    await transaction.commit();
    return res.status(200).json({
      status: true,
      response: {
        message: "book inserted successfully.",
        data: book,
      },
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    res.status(502).json({
      status: false,
      message: "Internal Server Error",
    });
  }
});

//update book
app.put("/:bk_id", async (req, res) => {
  const id = parseInt(req.params.bk_id);
  const updatedBookData = req.body;
  if (id) {
    updatedBookData?.bk_id ? delete updatedBookData.bk_id : null;
    const transaction = await dbClient.transaction();
    const result = await Book.update(updatedBookData, {
      where: {
        bk_id: id,
      },
      transaction,
      returning: true,
    });
    await transaction.commit();
    return res.status(200).json({
      status: true,
      response: {
        message: "book updated successfully.",
        data: result,
      },
    });
  } else {
    res.status(304).json({
      status: false,
      message: "please provide book id!",
    });
  }
});

//delete book
app.delete("/:bk_id", async (req, res) => {
  const id = parseInt(req.params.bk_id);
  if (id) {
    try {
      const transaction = await dbClient.transaction();
      let deletedBook = await Book.destroy({
        where: {
          bk_id: id,
        },
      });
      await transaction.commit();
      console.log("deleted book: ", deletedBook);
      if (deletedBook) {
        return res.status(200).json({
          status: true,
          response: {
            message: "book deleted successfully.",
          },
        });
      } else {
        return res.status(404).json({
          status: false,
          response: {
            message: "no book found with provided id!",
          },
        });
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return res.status(502).json({
        status: false,
        message: "Internal Server Error!",
      });
    }
  } else {
    return res.status(304).json({
      status: false,
      message: "please provide book id!",
    });
  }
});

module.exports = app;
