const user = require("../models/user");
const jwt = require("jsonwebtoken");
const helper = require("../helper");
const chalk = require("chalk");

module.exports.profile = async (req, res) => {
  return res.status(200).render("user/profile", {
    title: "Home",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};

module.exports.dashboard = async (req, res) => {
  return res.status(200).render("admin/index", {
    title: "Home",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};

module.exports.logout = async (req, res) => {
  if (req.signedCookies.token) {
    res.clearCookie("token");
  }
  return res.status(200).redirect("/");
  return res.status(500).send(helper.stt500());
};

module.exports.register = async (req, res) => {
  return res.render("user/register");
};

module.exports.login = async (req, res) => {
  return res.render("user/login");
};
