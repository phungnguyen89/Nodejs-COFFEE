const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const helper = require(".././../helper");
const app = require("../../models/app");

module.exports.DELETE = async (req, res) => {
  try {
    console.log(chalk.blue("DELETE API"), req.signedCookies.token);
    if (req.signedCookies.token) {
      let ret = await app.Cart.delete(req.signedCookies.token);
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
    let o = {
      token: req.signedCookies.token,
      id: req.body.id,
    };
    let ret = await app.Cart.deleteProductById(o);
    if (ret) return res.status(200).json(helper.stt200(ret));
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
      if (!token) {
        token = helper.createToken();
        res.cookie("token", helper.createToken(), {
          signed: true,
          maxAge: 1000 * 60 * 60 * 24 * 2,
        });
      }
      let cart = await app.Cart.getByToken(token);
      let ret;

      if (cart) {
        cart.item.push(req.body.productId);
        ret = await app.Cart.update(cart);
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
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }

  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let token = req.signedCookies.token;
    if (!token) {
      token = helper.createToken();
      res.cookie("token", token, {
        // httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2,
        signed: true,
      });
    }
    console.log(typeof helper.valueToken(token).exp);
    let ret = await app.Cart.getByToken(token);
    if (!ret)
      ret = await app.Cart.create({
        token: token,
        expireAt: new Date(helper.valueToken(token).exp),
      });

    // console.log(chalk.red(req.signedCookies.token));
    // console.log(chalk.blue("ret"), ret);
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
