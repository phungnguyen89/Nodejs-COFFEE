const user = require("../models/user");
const jwt = require("jsonwebtoken");
const helper = require("../helper");
const chalk = require("chalk");

module.exports.logout = async (req, res) => {
  if (req.signedCookies.token) {
    res.clearCookie("token");
  }
  return res.status(200).redirect("/");
  return res.status(500).send(helper.stt500());
};

module.exports.register = async (req, res) => {
  res.render("user/register");
};

module.exports.login = async (req, res) => {
  res.render("user/login");
};
