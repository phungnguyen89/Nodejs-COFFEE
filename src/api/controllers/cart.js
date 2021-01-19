const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const helper = require(".././../helper");
const app = require("../../models/app");

module.exports.DELETE = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      let ret = helper.valueToken(token).username
        ? await app.Cart.deleteByUsername(helper.valueToken(token).username)
        : await app.Cart.delete(token);
      if (ret) return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PUT = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      let ret = helper.valueToken(token).username
        ? await app.Cart.deleteProductByUsername({
            customer: helper.valueToken(token).username,
            id: req.body.id,
          })
        : await app.Cart.deleteProduct({ token: token, id: req.body.id });
      if (ret) return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.POST = async (req, res) => {
  try {
    if (req.body.productId) {
      let token = req.signedCookies.token;
      if (token) {
        let cart;
        if (helper.valueToken(token).username)
          cart = await app.Cart.getByUsername(helper.valueToken(token).username);
        else cart = await app.Cart.getByToken(token);
        let ret;
        if (cart) {
          cart.item.push(req.body.productId);
          ret = cart.customer
            ? await app.Cart.updateByUsername(cart)
            : await app.Cart.update(cart);
        } else {
          let o = {
            customer: helper.valueToken(token).username,
            token: token,
            item: req.body.productId,
          };
          ret = await app.Cart.create(o);
        }
        if (ret) return res.status(200).json(helper.stt200(ret));
      }
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }

  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (token) {
      let o = helper.valueToken(token);
      let ret;
      if (o.username) ret = await app.Cart.getByUsername(o.username);
      else ret = await app.Cart.getByToken(token);

      if (!ret)
        ret = await app.Cart.create({
          token: token,
          expireAt: new Date(helper.valueToken(token).exp * 1000),
        });

      if (ret) return res.status(200).json(helper.stt200(ret));
    }
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
