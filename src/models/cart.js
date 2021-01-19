const Cart = require("./model").Cart;
const chalk = require("chalk");
const helper = require("../helper");
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

module.exports.removeOne = async (token) => {
  try {
    let ret = await Cart.findOneAndDelete({ token: token });
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteByUsername = async (username) => {
  try {
    let ret = await Cart.findOneAndUpdate(
      { customer: username },
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

module.exports.deleteProductByUsername = async (o) => {
  try {
    let cart = await Cart.findOne({ customer: o.customer });

    if (cart.item.indexOf(o.id) > -1) cart.item.splice(cart.item.indexOf(o.id), 1);
    cart.updatedAt = new Date();
    let ret = await Cart.findOneAndUpdate(
      { token: cart.token },
      { $set: { item: cart.item } },
      { new: true }
    );

    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.deleteProduct = async (o) => {
  try {
    let cart = await Cart.findOne({ token: o.token });

    if (cart.item.indexOf(o.id) > -1) cart.item.splice(cart.item.indexOf(o.id), 1);
    cart.updatedAt = new Date();
    let ret = await Cart.findOneAndUpdate(
      { token: cart.token },
      { $set: { item: cart.item } },
      { new: true }
    );
    // let t = await Cart.findOneAndUpdate({ token: cart.token }, {}, { new: true });

    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.updateByUsername = async (o) => {
  try {
    o.updatedAt = new Date();
    o.token = null;
    let ret = await Cart.findOneAndUpdate({ customer: o.customer }, o);
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
    console.log(o);
    let newCart = new Cart(o);
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

module.exports.getByUsername = async (usr) => {
  try {
    let ret = await Cart.findOne({ customer: usr }).populate(populateOpt);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
