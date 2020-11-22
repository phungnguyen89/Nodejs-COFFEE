const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Coffee = require("./model").Coffee;
const chalk = require("chalk");

module.exports.update = async (o) => {
  console.log(chalk.red("model "), o);
  try {
    o.updatedAt = new Date();
    let ret = await Coffee.findById(o._id);
    console.log(chalk.red("model"), ret);
    return ret;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await Coffee.findByIdAndRemove(id);
    console.log(chalk.blue("model delte"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await Coffee.findById(id);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newCoffee = await new Coffee(o).save();

    return newCoffee;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getSearch = async (q) => {
  try {
    let ret = await Coffee.find({ name: { $regex: q, $options: "i" } });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getPage = async (p, size) => {
  try {
    console.log(chalk.blue("page,size"), p, size);
    let ret = await Coffee.find()
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
    let ret = await Coffee.countDocuments();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
module.exports.getAll = async () => {
  try {
    let a = await Coffee.find().sort({ createdAt: -1 });
    return a;
  } catch (err) {
    throw new Error(err);
  }
};
