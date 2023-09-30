const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");

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

    res.status(201).json({ message: "user register successfully!", saveUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: { error: "invaild details" } });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.send({
          message: {
            error: "invaild details",
          },
        });
      } else {
        res.send({ message: "login successfully!", user });
      }
    } else {
      return res.send({
        message: {
          error: "invaild details",
        },
      });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
