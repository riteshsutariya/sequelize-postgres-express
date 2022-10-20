const express = require("express");
const app = express.Router();
const employee = require("../db/model/employee");
const dbClient = require("../db/index");

//get all employees
app.get("/", async (req, res) => {
  try {
    let data = await employee.findAll();
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
          message: "no employees found!",
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

//get one employee
app.get("/:em_id", async (req, res) => {
  let id = req.params.em_id;
  if (id) {
    try {
      const result = await employee.findOne({
        where: {
          em_id: id,
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
          repsonse: { message: "employee not found with given id!messa" },
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

//insert employee
app.post("/", async (req, res) => {
  const newEmployee = req.body;
  if (newEmployee) {
    const transaction = await dbClient.transaction();
    try {
      const result = await employee.create(newEmployee, { transaction });
      await transaction.commit();
      return res.status(200).json({
        status: true,
        response: {
          message: "employee inserted successfully.",
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

//update employee
app.put("/:em_id", async (req, res) => {
  let id = parseInt(req.params.em_id);
  const updatedEmployee = req.body;
  console.log("id: ", id, "\n updatedEmployee: ", updatedEmployee);
  if (id && updatedEmployee) {
    const transaction = await dbClient.transaction();
    updatedEmployee?.em_id ? delete employee.em_id : null;
    try {
      const result = await employee.update(updatedEmployee, {
        where: {
          em_id: id,
        },
        transaction,
        returning: true,
      });
      await transaction.commit();
      console.log("result: ", result[0], "\n data:", result[1]);
      if (result[1].length) {
        return res.status(200).json({
          status: true,
          response: {
            message: "employee updated successfully.",
            data: result,
          },
        });
      } else {
        return res.status(404).json({
          status: false,
          response: {
            message: "employee not found with given id!",
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

//delete employee
app.delete("/:em_id", async (req, res) => {
  const id = parseInt(req.params.em_id);
  console.log(typeof id, id);
  const transaction = await dbClient.transaction();
  try {
    const result = await employee.destroy({
      where: { em_id: id },
      transaction,
    });
    await transaction.commit();
    if (result) {
      return res.status(200).json({
        status: true,
        response: {
          message: "employee deleted successfully.",
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        response: {
          message: "employee not found with given id!",
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
