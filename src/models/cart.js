const Cart = require("./model").Cart;

module.exports.crete = async (o) => {
  try {
    let newCart = new Cart(o);
    console.log(chalk.blue("new cart"), newCart);
    let ret = await newCart.save();
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getAll = async (token) => {
  try {
    let ret = await Cart.findById(token);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};
