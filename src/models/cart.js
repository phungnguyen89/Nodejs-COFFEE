const Cart = require("./model").Cart;
const chalk = require("chalk");
const selectFields = ["-createdAt", "-updatedAt"];
const populateOpt = {
  path: "item",
  select: selectFields,
  populate: {
    path: "info",
    select: selectFields,
    populate: { path: "category", select: ["name"] },
  },
};

module.exports.checkout = async (o) => {};

module.exports.delete = async (token) => {
  try {
    let ret = await Cart.findOneAndUpdate(
      { token: token },
      {
        $set: {
          updatedAt: new Date(),
          item: [],
        },
      }
    );
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteProductById = async (o) => {
  try {
    let cart = await Cart.findOne({ token: o.token });

    cart.item.splice(cart.item.indexOf(o.id), 1);
    cart.updatedAt = new Date();
    let ret = await Cart.findOneAndUpdate({ token: cart.token }, cart, { new: true });
    // let t = await Cart.findOneAndUpdate({ token: cart.token }, {}, { new: true });

    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.update = async (o) => {
  try {
    o.updatedAt = new Date();
    let ret = await Cart.findOneAndUpdate({ token: o.token }, o);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newCart = new Cart(o);
    //  console.log(chalk.blue("new cart"), newCart);
    let ret = await newCart.save();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByToken = async (token) => {
  try {
    let ret = await Cart.findOne({ token: token }).populate(populateOpt);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
