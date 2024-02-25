const express = require("express");
const { Router } = require("express");
const userController = Router();
const { AuthModel } = require("../Modal/userauth.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register user
userController.post("/register", async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // Hash the password
    const hash = await bcrypt.hash(password, 5);

    // Create a new user document with hashed password
    const user = new AuthModel({
      name,
      email,
      password: hash,
      username,
    });

    // Save the new user to the database
    await user.save();

    // Send response with success message and API count
    res
      .status(200)
      .send({ message: "Registered Successfully", count: req.body.count });
  } catch (err) {
    // Handle errors
    console.error("Error:", err);
    res
      .status(502)
      .send({ message: "Already Registered", count: req.body.count });
  }
});

// User login
userController.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    // Find user by email
    const user = await AuthModel.findOne({ username: email });

    // If user not found, return error
    if (!user) {
      return res
        .status(406)
        .send({ message: "Wrong Credentials", count: req.body.count });
    }

    // Compare hashed password
    const result = await bcrypt.compare(password, user.password);

    // If passwords match, generate JWT token
    if (result) {
      const token = jwt.sign({ userId: user.email }, process.env.SECRET_KEY);
      // Send response with token, user data, and API count
      res.status(200).json({ token, user, count: req.body.count });
    } else {
      // If passwords do not match, return error
      res
        .status(406)
        .send({ message: "Wrong Credentials", count: req.body.count });
    }
  } catch (err) {
    // Handle errors
    console.error("Error:", err);
    res
      .status(500)
      .send({ message: "Internal Server Error", count: req.body.count });
  }
});

module.exports = {
  userController,
};
