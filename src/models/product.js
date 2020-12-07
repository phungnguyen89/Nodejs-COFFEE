const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./model").Product;
const ProductInfo = require("./model").ProductInfo;
const chalk = require("chalk");

const selectFields = ["-createdAt", "-updatedAt"];
const populateOpt = {
  path: "info",
  select: selectFields,
  populate: { path: "category", select: ["name"] },
};

module.exports.update = async (o) => {
  console.log(chalk.red("model "), o);
  try {
    o.updatedAt = new Date();
    let ret = await Product.findByIdAndUpdate(o._id, o, { new: true });
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
    let ret = await Product.findById(id).populate(populateOpt);
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
    console.log(chalk.red("we got search Product"));
    let conds = Object.assign({}, populateOpt);

    conds.match = { name: { $regex: q, $options: "i" } };

    let ret = await Product.find({ "info.name": { $regex: q, $options: "i" } })
      .populate(conds)
      .sort({ updatedAt: -1 });
    console.log(chalk.blackBright("ret "), ret);
    // console.log(chalk.blue("search"), ret);
    // let ret = await Product.find({ name: { $regex: q, $options: "i" } })
    //   .populate(populateOpt)
    //   .sort({ updatedAt: -1 });
    //return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getPage = async (p, size) => {
  try {
    let ret = await Product.find({})
      .populate(populateOpt)
      .skip((p - 1) * size)
      .limit(size)
      .sort({ updatedAt: -1 });
    // let ret = await Product.find()
    //   .populate("info")
    //   .skip((p - 1) * size)
    //   .limit(size)
    //   .sort({ updatedAt: -1 });
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
    let ret = await Product.find({}).populate(populateOpt);
    //let a = await Product.find().populate("info").sort({ updatedAt: -1 });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
