const express = require("express");
const router = express.Router();

const { User } = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("getting from auth!");
});
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password } = req.body;
  if (!name || !email || !phone || !work || !password)
    return res.status(422).json({ message: { error: "Invalid Details" } });

  try {
    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });

    if (emailExist) {
      return res
        .status(422)
        .json({ message: { error: "Email already exist!" } });
    }
    if (phoneExist) {
      return res
        .status(422)
        .json({ message: { error: "Phone number already exist!" } });
    }

    const user = new User({ name, email, phone, work, password });

    const saveUser = await user.save();

    if (saveUser) {
      return res
        .status(201)
        .json({ message: "user register successfully!", saveUser });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
