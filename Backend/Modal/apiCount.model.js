const mongoose = require("mongoose");
const countSchema = new mongoose.Schema({
	count: Number
});

const apiCountModel = mongoose.model("apiCount", countSchema);
module.exports = { apiCountModel };
