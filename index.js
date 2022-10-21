const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bookRoute = require("./routes/book");
const employeeRoute = require("./routes/employee");
const departmentRoute = require("./routes/deaprtment");
const checkDB = require("./auth/connection");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

//check database connection
checkDB();

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "api running...",
  });
});

app.use("/book", bookRoute);
app.use("/employee", employeeRoute);
app.use("/department", departmentRoute);

app.listen(PORT, () => {
  console.log(`app listening http://localhost:${PORT}`);
});
