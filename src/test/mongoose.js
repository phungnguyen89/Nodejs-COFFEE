require("../configs/configs").connectDatabase();
const app = require("../models/app");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema(
  {
    price: {
      type: Number,
      default: 1,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
    size: {
      type: Number,
      default: 1,
      required: true,
    },
    info: { type: String, ref: "productInfo" },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", product, "products");

let t = async function () {
  //let a = await app.ProductInfo.getAll();
  // console.log(a);
  let newProduct = new Product({
    price: 10000,
    quantity: 10,
    size: 0.5,
    info: "5fb553be04fad90820f184a3",
  });
  await newProduct.save();
  let b = await Product.find().populate("info");
  console.log(b);
};
t();
