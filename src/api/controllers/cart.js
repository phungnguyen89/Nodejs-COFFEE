const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const helper = require(".././../helper");
const app = require("../../models/app");

module.exports.DELETE = async (req, res) => {
  try {
    console.log(chalk.blue("DELETE API"), req.params);
    let o = {
      token: req.signedCookies.token,
      id: req.params.id,
    };
    let ret = await app.Cart.deleteProductById(o);
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
};

module.exports.PUT = async (req, res) => {
  try {
    console.log(chalk.blue("DELETE API"), req.params);
    let o = {
      token: req.signedCookies.token,
      id: req.params.id,
    };
    let ret = await app.Cart.deleteProductById(o);
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
};

module.exports.POST = async (req, res) => {
  try {
    let cart = await app.Cart.getByToken(req.signedCookies.token);
    let ret;

    if (cart) {
      cart.productList.push(req.body.id);
      ret = await app.Cart.update(cart);
      console.log(chalk.bgRed("update experied"), ret);
    } else {
      let o = {
        token: req.signedCookies.token,
        productList: req.body.id,
      };
      ret = await app.Cart.create(o);
    }
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.blue(err));
    return res.status(500).json(helper.stt500());
  }

  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let ret = await app.Cart.getByToken(req.signedCookies.token);
    //console.log(chalk.red(req.signedCookies.token));
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    //console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
