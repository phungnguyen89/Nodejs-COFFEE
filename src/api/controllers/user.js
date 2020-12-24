const app = require("../../models/app");
const helper = require("../../helper");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
module.exports.LOGOUT = async (req, res) => {
  let token = req.signedCookies.token || req.body.token || req.headers.authorization;
  if (token) {
    res.clearCookie("token");
  }
  return res.status(200).redirect("/");
  // return res.status(400).json(helper.stt400());
};

module.exports.LOGIN = async (req, res) => {
  console.log("we got login api");
  if (res.locals.data) {
    let token = helper.createToken(res.locals.data);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 10,
      // httpOnly: true,
      signed: true,
    });
    return res.status(200).json(helper.stt200());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.DELETE = async (req, res) => {
  if (req.params.id) {
    try {
      let ret = await app.User.deleteById(req.params.id);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PUT = async (req, res) => {
  if (res.locals.data) {
    try {
      //console.log(chalk.red("we got controller, has data"), res.locals.data);
      let ret = await app.User.update(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      //console.log(chalk.red(err));
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.POST = async (req, res) => {
  if (res.locals.data) {
    // console.log(chalk.blue("has data"), res.locals.data);
    try {
      let ret = await app.User.create(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let ret = req.params.id
      ? await app.User.getByUsername(req.params.id)
      : await app.User.getAll();
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).json(helper.stt500(err));
  }
  return res.status(400).json(helper.stt400());
};
