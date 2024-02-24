const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db.js");
const { userController } = require("./Routes/userauth.routes.js");
const teamMemberRouter = require("./Routes/teamMember.routes.js");
const { apiCount } = require("./Middleware/apiCount.js");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(apiCount);
app.get("/", function (req, res) {
  res.status(200).send({ msg: "Welcome to HomePage", count: req.body.count });
});
app.use("/user", userController);
app.use("/team", teamMemberRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`application listen on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
