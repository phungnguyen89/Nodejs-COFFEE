const helper = require("../helper");
const app = require("../models/app");
const validate = require("../validates/user");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

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
      return res.status(400).json(helper.stt400(`"${valid.value.username}" not found`));
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
  try {
    //check token get username
    let token = helper.valueToken(req.signedCookies.token);
    if (token.username) {
    }
    let ret = await app.User.getByUsername(valid.value.username);

    let valid = validate.profile(req.body);
    if (valid.error) {
      return res.status(400).json(helper.stt400(valid.error.details[0].message));
    }

    if (ret) {
      ret.profile = valid.value.profile;
      ret.email = valid.value.email;
      res.locals.data = ret;
      return next();
    }
    return res.status(400).json(helper.stt400(`${valid.value.username} not existing`));
  } catch (err) {
    console.log("user update middle", err);
    return res.status(500).json(helper.stt500());
  }
};

module.exports.registerCheck = async (req, res, next) => {
  //validate
  console.log(chalk.blue("req body"), req.body);
  let valid = validate.create(req.body);
  if (valid.error)
    return res.status(400).json(helper.stt400(valid.error.details[0].message));

  // check existing
  try {
    let ret = await app.User.getByUsernameOrEmail(valid.value);
    if (ret) {
      for (let i in ret) {
        if (ret[i].username == valid.value.username)
          return res
            .status(400)
            .json(helper.stt400(`"${ret[i].username}" already exists`));
        if (ret[i].email == valid.value.email)
          return res.status(400).json(helper.stt400(`"${ret[i].email}" already exists`));
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(helper.stt500());
  }

  //next();
  valid.value.password = helper.hashPassword(valid.value.username, valid.value.password);
  //format value
  res.locals.data = valid.value;
  return next();
};
