const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { userController } = require("./Routes/userauth.routes.js");
const teamMemberRouter = require("./Routes/teamMember.routes.js");
const { apiCount } = require("./Middleware/apiCount.js");
require("dotenv").config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get("/", function (req, res) {
  res.status(200).send({ msg: "Welcome to HomePage" });
});

// Routes
app.use("/user", userController);
app.use("/team", apiCount, teamMemberRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Application listening on port ${PORT}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
});
