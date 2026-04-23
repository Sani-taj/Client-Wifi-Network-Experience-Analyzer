const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB
mongoose.connect("mongodb+srv://sani-taj:@cluster0.dy9kqsb.mongodb.net/wifiApp")
.then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// 📄 User Schema
const User = mongoose.model("User", {
  username: String,
  password: String
});

// 🔐 Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashed });
  await user.save();

  res.send({ message: "User created" });
});

// 🔑 Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secret123");

  res.send({ token });
});

// 🔒 Protected route (metrics)
app.get("/metrics", (req, res) => {
  res.send({
    latency: Math.floor(Math.random() * 150),
    jitter: Math.floor(Math.random() * 50),
    loss: Math.random() * 5,
    throughput: Math.floor(Math.random() * 100)
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));