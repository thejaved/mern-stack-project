const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 1000;

require("dotenv").config();

require("./db/dbConnection");

app.use(express.json());

app.use("/auth", require("./router/auth"));

app.get("/", (req, res) => {
  res.send("getting from app.js");
});

app.listen(PORT, () =>
  console.log(`server is listening in port http://localhost:${PORT}`)
);
