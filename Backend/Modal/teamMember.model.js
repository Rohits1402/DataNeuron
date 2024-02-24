// TeamMemberModel.js
const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: String,
  skills: String,
  contactNumber: String,
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
