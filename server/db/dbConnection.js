const mongoose = require("mongoose");

// mongo connection
mongoose
  .connect(process.env.DB)
  .then(() => console.log("successfully connected!"))
  .catch(() => console.log("connection failed!"));
