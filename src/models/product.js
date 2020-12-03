const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./model").Product;
const chalk = require("chalk");

module.exports.update = async (o) => {
  console.log(chalk.red("model "), o);
  try {
    o.updatedAt = new Date();
    let ret = await Product.findById(o._id);
    console.log(chalk.red("model"), ret);
    return ret;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await Product.findByIdAndRemove(id);
    console.log(chalk.blue("model delte"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await Product.findById(id);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    // for (let i = 1; i < 101; i++) {
    //   let cf = Object.assign({}, o);
    //   cf.name += i;
    //   cf.quote += i;
    //   cf.description += i;
    //   await new Product(cf).save();
    // }
    let newProduct = await new Product(o).save();
    return newProduct;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getSearch = async (q) => {
  try {
    let ret = await Product.find({ name: { $regex: q, $options: "i" } });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getPage = async (p, size) => {
  try {
    console.log(chalk.blue("page,size"), p, size);
    let ret = await Product.find()
      .populate("info")
      .skip((p - 1) * size)
      .limit(size)
      .sort({ updatedAt: -1 });
    // console.log(chalk.blue("MODELS"), ret);
    // console.log(chalk.blue("MODELS"));
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.count = async () => {
  try {
    let ret = await Product.countDocuments();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getAll = async () => {
  try {
    let a = await Product.find().populate("info").sort({ updatedAt: -1 });
    return a;
  } catch (err) {
    throw new Error(err);
  }
};
