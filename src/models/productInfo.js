const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductInfo = require("./model").ProductInfo;
const chalk = require("chalk");

module.exports.update = async (o) => {
  console.log(chalk.red("model "), o);
  try {
    o.updatedAt = new Date();
    let ret = await ProductInfo.findById(o._id);
    // console.log(chalk.red("model"), ret);
    return ret;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await ProductInfo.findByIdAndRemove(id);
    //console.log(chalk.blue("model delte"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await ProductInfo.findById(id);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newProductInfo = await new ProductInfo(o).save();
    return newProductInfo;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getSearch = async (q) => {
  try {
    let ret = await ProductInfo.find({ name: { $regex: q, $options: "i" } });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getPage = async (p, size) => {
  try {
    // console.log(chalk.blue("page,size"), p, size);
    let ret = await ProductInfo.find()
      .skip((p - 1) * size)
      .limit(size);
    // console.log(chalk.blue("MODELS"), ret);
    // console.log(chalk.blue("MODELS"));
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.count = async () => {
  try {
    let ret = await ProductInfo.countDocuments();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getAll = async () => {
  try {
    let a = await ProductInfo.find().sort({ createdAt: -1 });
    return a;
  } catch (err) {
    throw new Error(err);
  }
};
