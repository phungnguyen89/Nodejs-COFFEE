const app = require("../models/appRepository.js");
const chalk = require("chalk");
//const ml = require("path").join(__dirname, "models");

module.exports.search = async (req, res, next) => {
  if (req.query.q) {
    try {
      let ret = await app.Product.getSearch(req.query.q);
      if (ret)
        return res.status(200).render("home/index", {
          a: ret,
          title: "Express",
          isAuthenticated:
            req.cookies.token || req.body.token || req.headers.authorization
              ? true
              : false,
        });
      return res.status(400).render("error", { layout: false, message: "BAD NETWORK" });
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
        isAuthenticated:
          req.cookies.token || req.body.token || req.headers.authorization ? true : false,
      });
    return res.status(400).render("error", { layout: false, message: "BAD NET WORK" });
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};

module.exports.index = async (req, res, next) => {
  //console.log(chalk.red("error"));
  try {
    let p = req.params.p || 1;
    let size = 20;
    let ret = await app.Product.getPage(p, size);
    let total = await app.Product.count();
    let n = Math.ceil(total / size);
    //console.log(total);
    //console.log(chalk.blue("index"), ret);
    if (ret)
      return res.status(200).render("home/index", {
        a: ret,
        p: p,
        n: n,
        title: "Express",
        isAuthenticated:
          req.cookies.token || req.body.token || req.headers.authorization ? true : false,
      });
    return res.status(400).render("error", { layout: false, message: "BAD NETWORK" });
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};
