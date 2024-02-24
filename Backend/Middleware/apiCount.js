// import { apiCountModel } from "../Modal/apiCount.model";

const {apiCountModel}= require("../Modal/apiCount.model.js")

const apiCount = async (req, res, next) => {
  try {
    let apiData = await apiCountModel.findOne();
    if (apiData) {
      apiData.count++;
      await apiCountModel.findOneAndUpdate(apiData);
      req.body.count = apiData.count;
    } else {
      await apiCountModel.create({ count: 1 });
      req.body.count = 1;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { apiCount };
