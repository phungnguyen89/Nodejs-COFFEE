const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart = new Schema(
  {
    token: { type: String, required: true },
    productList: [{ type: String, ref: "coffees" }],
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

const coffee = new Schema(
  {
    name: { type: String },
    quote: { type: String },
    imgUrl: { type: String, default: "default" },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports.Cart = mongoose.model("carts", cart, "carts");
module.exports.User = mongoose.model("users", user, "users");
module.exports.Coffee = mongoose.model("coffees", coffee, "coffees");
