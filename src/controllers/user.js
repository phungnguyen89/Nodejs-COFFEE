const user = require("../models/user");
const jwt = require("jsonwebtoken");
const helper = require("../helper");
const chalk = require("chalk");
module.exports.logout = async (req, res) => {
  let token = req.signedCookies.token || req.body.token || req.headers.authorization;
  console.log(chalk.red("token"), token);

  let decode = jwt.verify(token, process.env.TOKEN_SECRECT);
  console.log(decode);
  if (req.signedCookies.token) {
    return res.status(200).send(helper.stt200());
  }
  return res.status(500).send(helper.stt500());
};

module.exports.login = async (req, res) => {
  //set the token
  if (res.locals.data) {
    let payload = {
      username: res.locals.data.username,
      name: res.locals.data.profile.fullName,
      role: res.locals.data.role,
    };

    let token = jwt.sign(payload, process.env.TOKEN_SECRECT, {
      expiresIn: `${1000 * 60 * 30}`,
    });

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).redirect("/");
  }
};
