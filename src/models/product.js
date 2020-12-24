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
    // let agg = [];
    // agg.push({
    //   $match: {
    //     name: { $regex: q, $options: "i" },
    //   },
    // });
    // agg.push({
    //   $lookup: {
    //     from: "products",
    //     localField: "_id",
    //     foreignField: "info",
    //     as: "ret",
    //   },
    // });
    // let idlist = await ProductInfo.find({
    //   name: { $regex: { $text: { $search: q } }, $options: "i" },
    // }).select("_id");
    let idlist = await ProductInfo.find({ name: { $regex: q, $options: "i" } }).select(
      "_id"
    );

    if (idlist.length > 1) {
      idlist = idlist.map(function (o) {
        return o._id;
      });
      let ret = await Product.find({ info: { $in: idlist } }).populate(populateOpt);
      return ret;
    }
    return null;
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
