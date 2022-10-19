const express = require("express");
const app = express.Router();
const books = require("../data/books");
//get all books
app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    response: {
      data: books,
    },
  });
});

//get book by id
app.get("/:bk_id", (req, res) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let id = parseInt(req.params.bk_id);
  if (id) {
    const result = books.find((book) => {
      if (book.bk_id === id) {
        console.log("object found");
        return true;
      }
    });
    console.log(result);
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
app.post("/", (req, res) => {
  const newBook = req.body;
  const result = books.find((book) => {
    if (book.bk_id === parseInt(newBook.bk_id)) {
      return true;
    }
  });
  if (result) {
    return res.status(302).json({
      status: false,
      response: {
        message: "book already exists with provided id!",
      },
    });
  } else {
    books.push(newBook);
    return res.status(200).json({
      status: true,
      response: {
        message: "book inserted successfully.",
      },
    });
  }
});

//update book
app.put("/:bk_id", (req, res) => {
  const id = parseInt(req.params.bk_id);
  const updatedBookData = req.body;
  if (id) {
    const resultIndex = books.findIndex((book) => book.bk_id === id);
    if (resultIndex !== -1) {
      delete updatedBookData.bk_id;
      books[resultIndex] = { ...books[resultIndex], ...updatedBookData };
      res.status(200).json({
        status: true,
        response: {
          message: "book updated successfully.",
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

//delete book
app.delete("/:bk_id", (req, res) => {
  const id = parseInt(req.params.bk_id);
  if (id) {
    const resultIndex = books.findIndex((book) => book.bk_id === id);
    if (resultIndex !== -1) {
      books.splice(resultIndex, 1);
      res.status(200).json({
        status: true,
        response: {
          message: "book deleted successfully.",
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

module.exports = app;
