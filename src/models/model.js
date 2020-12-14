const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// item: [
//   { id: { type: String, ref: "products" } },
//   { num: { type: Number, default: 1 } },
// ],
const cart = new Schema(
  {
    token: { type: String, required: true },
    customer: { type: String, ref: "users" },
    item: [{ type: String, ref: "products" }],
    expireAt: { type: Date, default: new Date(), expires: 60 * 5 },
  },
  { timestamps: true }
);
const user = new Schema(
  {
    email: {
      type: String,
      default: new mongoose.Types.ObjectId().toHexString() + "@email.com",
      unique: true,
    },
    username: {
      type: String,
      min: 30,
      max: 100,
      lowercase: true,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      min: 6,
      max: 50,
      require: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    profile: {
      fullName: { type: String, uppercase: true, default: "NO NAME" },
      address: { type: String },
      gender: { type: Boolean, default: 1 },
      birthDate: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

const product = new Schema(
  {
    info: { type: String, ref: "productInfo" },
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
      default: 0.5,
      required: true,
    },
  },
  { timestamps: true }
);

const productInfo = new Schema(
  {
    name: { type: String, unique: true },
    quote: { type: String },
    imgUrl: { type: String, default: "default" },
    description: { type: String },
    category: [{ type: String, ref: "categories" }],
  },
  { timestamps: true }
);

const category = new Schema(
  {
    name: { type: String, unique: true },
    // parent: { type: String, ref: "categories" },
  },
  { timestamps: true }
);

module.exports.Cart = mongoose.model("carts", cart, "carts");
module.exports.User = mongoose.model("users", user, "users");
module.exports.Product = mongoose.model("products", product, "products");
module.exports.ProductInfo = mongoose.model("productInfo", productInfo, "productInfo");
module.exports.Category = mongoose.model("categories", category, "categories");
