const app = require("../models/app.js");
const chalk = require("chalk");
const helper = require("../helper");
//const ml = require("path").join(__dirname, "models");

module.exports.search = async (req, res, next) => {
  if (req.query.q) {
    try {
      let ret = await app.Product.getSearch(req.query.q);
      if (ret)
        return res.status(200).render("home/shop", {
          a: ret,
          title: "Express",
          q: req.query.q,
          isAuthenticated: helper.valueToken(req.signedCookies.token).username
            ? true
            : false,
        });
      return res.status(200).render("home/shop", {
        message: `No Products was found with "${req.query.q}"`,
        title: "Express",
        q: req.query.q,
        isAuthenticated: helper.valueToken(req.signedCookies.token).username
          ? true
          : false,
      });
    } catch (err) {
      return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
    }
  }
  return res.status(400).render("error", { layout: false, message: "BAD NETWORK" });
};
module.exports.detail = async (req, res, next) => {
  try {
    let ret = await app.Product.getById(req.params.id);
    if (ret)
      return res.status(200).render("home/detail", {
        o: ret,
        title: "DETAIL",
        isAuthenticated: helper.valueToken(req.signedCookies.token).username
          ? true
          : false,
      });
    return res.status(400).render("error", { layout: false, message: "BAD NET WORK" });
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};

module.exports.shop = async (req, res, next) => {
  try {
    let p = req.params.p || 1;
    let size = 20;
    let ret = await app.Product.getPage(p, size);
    // console.log(chalk.blue("get result"), ret);
    let total = await app.Product.count();
    let n = Math.ceil(total / size);
    if (ret)
      return res.status(200).render("home/shop", {
        a: ret,
        p: p,
        n: n,
        title: "Home",
        isAuthenticated: helper.valueToken(req.signedCookies.token).username
          ? true
          : false,
      });
  } catch (err) {
    console.log(chalk.red(err));
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
  return res.status(400).render("error", { layout: false, message: "BAD NETWORK" });
};

module.exports.index = (req, res) => {
  return res.render("home/index", { title: "HOME" });
};
