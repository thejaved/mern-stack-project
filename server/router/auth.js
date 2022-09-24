const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("getting from auth!");
});
router.post("/register", (req, res) => {
  res.send(req.body);
});

module.exports = router;
