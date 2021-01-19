const helper = require("../helper");
const chalk = require("chalk");
const app = require("../models/app");

module.exports.checkTokenCart = async (req, res, next) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      let cart = await app.Cart.getByToken(token);
      if (cart) {
        if (cart.item.length > 0) {
          let ret = await app.Cart.getByUsername(res.locals.data.username);
          if (ret) {
            // username has cart in dtb and push the current cart
            console.log(chalk.blue(" has cart in dtb"));
            ret.item.concat(cart.item);
            ret = await app.Cart.updateByUsername(ret);
          } else {
            // usernmae has no cart in dtb
            console.log(chalk.red(" has  no cart in dtb"));
            cart.customer = res.locals.data.username;
            res.locals.cart = {
              item: cart.item,
              customer: res.locals.data.username,
              token: res.locals.data.username,
            };
          }
        }
        await app.Cart.removeOne(token);
      }
    }
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.tokenCheck = async (req, res, next) => {
  try {
    let token = req.signedCookies.token;
    if (!token) {
      token = helper.createToken();
      res.cookie("token", token, {
        // maxAge: 1000 * 60 * 60 * 24 * 2,
        signed: true,
      });
    }
    return next();
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
};
