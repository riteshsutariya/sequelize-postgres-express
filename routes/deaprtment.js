const express = require("express");
const app = express.Router();
const { departments: department } = require("../db/index").models;
const { dbClient } = require("../db/index");

//get all employees
app.get("/", async (req, res) => {
  try {
    let data = await department.findAll();
    console.log(data);
    if (data.length) {
      res.status(200).json({
        status: true,
        response: {
          data: data,
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        repsonse: {
          message: "no deaprtments found!",
        },
      });
    }
  } catch (error) {
    console.log("error: ", error);
    return res.status(502).json({
      status: false,
      response: "Intenal Server Error",
    });
  }
});

//get one department
app.get("/:dep_id", async (req, res) => {
  let id = req.params.dep_id;
  if (id) {
    try {
      const result = await department.findOne({
        where: {
          dep_id: id,
        },
      });
      if (result) {
        return res.status(200).json({
          status: true,
          response: {
            data: result,
          },
        });
      } else {
        return res.status(404).json({
          status: false,
          repsonse: { message: "department not found with given id!" },
        });
      }
    } catch (error) {
      console.log("error: ", error);
      return res.status(502).json({
        status: false,
        response: "Intenal Server Error",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      response: "Bad Request!",
    });
  }
});

//insert department
app.post("/", async (req, res) => {
  const newEmployee = req.body;
  if (newEmployee) {
    const transaction = await dbClient.transaction();
    try {
      const result = await department.create(newEmployee, { transaction });
      await transaction.commit();
      return res.status(200).json({
        status: true,
        response: {
          message: "deaprtment inserted successfully.",
          data: result,
        },
      });
    } catch (error) {
      console.log("error: ", error);
      await transaction.rollback();
      return res.status(502).json({
        status: false,
        response: "Intenal Server Error",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      response: "Invalid Request",
    });
  }
});

//update department
app.put("/:dep_id", async (req, res) => {
  let id = parseInt(req.params.dep_id);
  const updatedDepartment = req.body;
  if (id && updatedDepartment) {
    const transaction = await dbClient.transaction();
    updatedDepartment?.dep_id ? delete department.dep_id : null;
    try {
      const result = await department.update(updatedDepartment, {
        where: {
          dep_id: id,
        },
        transaction,
        returning: true,
      });
      await transaction.commit();
      if (result[1].length) {
        return res.status(200).json({
          status: true,
          response: {
            message: "department updated successfully.",
            data: result,
          },
        });
      } else {
        return res.status(404).json({
          status: false,
          response: {
            message: "department not found with given id!",
          },
        });
      }
    } catch (error) {
      console.log("error: ", error);
      await transaction.rollback();
      return res.status(502).json({
        status: false,
        response: "Intenal Server Error",
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      response: { message: "Bad Request!" },
    });
  }
});

//delete department
app.delete("/:dep_id", async (req, res) => {
  const id = parseInt(req.params.dep_id);
  const transaction = await dbClient.transaction();
  try {
    const result = await department.destroy({
      where: { dep_id: id },
      transaction,
    });
    await transaction.commit();
    if (result) {
      return res.status(200).json({
        status: true,
        response: {
          message: "department deleted successfully.",
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        response: {
          message: "department not found with given id!",
        },
      });
    }
  } catch (error) {
    console.log("error: ", error);
    await transaction.rollback();
    return res.status(502).json({
      status: false,
      response: "Intenal Server Error",
    });
  }
});

module.exports = app;
