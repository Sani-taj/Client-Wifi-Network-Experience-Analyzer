const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashed
  });

  await user.save();
  res.json("User registered");
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ token });
});

module.exports = router;