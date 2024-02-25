const { apiCountModel } = require("../Modal/apiCount.model.js");

const apiCount = async (req, res, next) => {
  try {
    let apiData = await apiCountModel.findOne();
    if (apiData) {
      // If data exists, then increment the count
      apiData.count++;
      await apiCountModel.findByIdAndUpdate(apiData._id, {
        count: apiData.count,
      });
    } else {
      // If no data exists, we create a new entry with count initialized to 1
      await apiCountModel.create({ count: 1 });
    }
    // Attaching the count to the request body
    req.body.count = apiData ? apiData.count : 1;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { apiCount };
