const Cart = require("./model").Cart;
const chalk = require("chalk");

module.exports.deleteProductById = async (o) => {
  try {
    let cart = await Cart.findOne({ token: o.token });

    cart.productList.splice(cart.productList.indexOf(o.id), 1);
    cart.updatedAt = new Date();
    let ret = await Cart.findOneAndUpdate({ token: cart.token }, cart);

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
    //console.log(chalk.red(token));
    let ret = await Cart.findOne({ token: token }).populate("productList");
    // console.log(chalk.blue("get by token"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
