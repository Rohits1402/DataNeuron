const { apiCountModel } = require("../Modal/apiCount.model.js");

/**
 * Middleware to track the count of API calls.
 */
const apiCount = async (req, res, next) => {
  try {
    // Find the API count data
    let apiData = await apiCountModel.findOne();

    // If data exists, increment the count, otherwise create a new entry
    if (apiData) {
      apiData.count++;
      await apiCountModel.findByIdAndUpdate(apiData._id, {
        count: apiData.count,
      });
    } else {
      await apiCountModel.create({ count: 1 });
    }

    // Attach the count to the request body
    req.body.count = apiData ? apiData.count : 1;
    next();
  } catch (error) {
    console.error("Error in apiCount middleware:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { apiCount };
