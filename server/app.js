const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

require("./db/dbConnection");

const { User } = require("./model/userSchema");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`server is listening in port https://localhost:${PORT}`)
);
