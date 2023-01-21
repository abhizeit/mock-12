const express = require("express");
const User = require("../models/user.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const app = express.Router();

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashed = await argon2.hash(password);
    const user = await User.create({ email, password: hashed });
    res.send({ error: false, data: user, message: "Singup Successful" });
  } catch (e) {
    res.send({ error: true, message: "something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const match = await argon2.verify(user.password, password);
    if (!match) {
      res.send({ error: true, message: "Invalid Credentials" });
    } else {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);
      res.send({ error: false, token, message: "Login Successful" });
    }
  } catch (e) {
    res.send({ error: true, message: "No User Found" });
  }
});

app.get("/getProfile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send({ error: false, user, messgae: "Profile fethced succesfully." });
  } catch (e) {
    res.send({ error: true, messgae: "Something went wrong." });
  }
});

module.exports = app;
