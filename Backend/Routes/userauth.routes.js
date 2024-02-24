const express = require('express');
const { Router } = require('express');
const userController = Router();
const { AuthModel } = require("../Modal/userauth.model.js");
const bcrypt = require("bcrypt");
// const userController = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

userController.post("/register", async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    console.log(req.body);
    const hash = await bcrypt.hash(password, 5);
    const user = new AuthModel({
      name,
      email,
      password: hash,
      username,
      
    });
    await user.save();
    res.status(200).send({ message: "Registered Successfully",count: req.body.count });
  } catch (err) {
    console.log('err: ', err);
    res.status(502).send({ message: "Already Registered", count: req.body.count });
  }
});

userController.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log('req.body: ', req.body);
    const user = await AuthModel.findOne({ username: email });

    if (!user) {
      return res.status(406).send({ message: "Wrong Credentials", count: req.body.count });
    }

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ userId: user.email }, process.env.SECRET_KEY);
      res.status(200).json({ token, user, count: req.body.count });
    } else {
      res.status(406).send({ message: "Wrong Credentials", count: req.body.count });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", count: req.body.count });
  }
});

module.exports = {
  userController
};
