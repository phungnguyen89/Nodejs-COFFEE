const helper = require("../helper");
const app = require("../models/appRepository");
const validate = require("../validates/user");
const chalk = require("chalk");
module.exports.loginCheck = async (req, res, next) => {
  //validtate
  let valid = validate.login(req.body);
  if (valid.error) {
    console.log(chalk.red("loginCheck"), valid.error);
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  }

  //check existing
  try {
    let ret = await app.User.getByUsername(valid.value.username);
    //not found
    if (!ret)
      return res.status(400).json(helper.stt400(`${valid.value.username} not found`));
    else {
      //existing 1 // feature  more in someday
      valid.value.password = helper.hashPassword(
        valid.value.username,
        valid.value.password
      );
      //check password
      if (valid.value.password === ret.password) {
        res.locals.data = ret;
        return next();
      }
      return res.status(400).json(helper.stt400("Password Incorrect"));
    }
    //not existing
  } catch (err) {
    return res.status(500).json(helper.stt500(err));
  }
};

module.exports.updateCheck = async (req, res, next) => {
  let valid = validate.update(req.body);
  if (valid.error) {
    //console.log(chalk.red("middleware update"), valid.error);
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  }
  // check existing
  try {
    let ret = await app.User.getByUsername(valid.value.username);
    if (ret) {
      //console.log(valid.value);
      //console.log(chalk.red("USER"), ret);
      // console.log(chalk.red("VALIDATE"), valid.value);
      ret.profile = valid.value.profile;
      ret.email = valid.value.email;
      res.locals.data = ret;
      return next();
      return res.status(200).json(helper.stt200(ret));
    }
    return res.status(400).json(helper.stt400(`${valid.value.username} not existing`));
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
};

module.exports.registerCheck = async (req, res, next) => {
  //validate
  let valid = validate.create(req.body);
  if (valid.error)
    return res.status(400).json(helper.stt400(valid.error.details[0].message));

  // check existing
  try {
    let ret = await app.User.getByUsername(valid.value.username);
    if (ret) return res.status(400).json(helper.stt400(`${ret.username} already exists`));
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }

  //next();
  valid.value.password = helper.hashPassword(valid.value.username, valid.value.password);
  //format value
  res.locals.data = valid.value;
  return next();
};

module.exports.PUT = async (req, res) => {};
