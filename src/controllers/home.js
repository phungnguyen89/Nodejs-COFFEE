const product = require("../models/product.js");
//const ml = require("path").join(__dirname, "models");

module.exports.detail = (req, res, next) => {
  product
    .getProductById(req.params.id)
    .then((val) => {
      res.render("home/detail", {
        o: val,
        title: "DETAIL",
        isAuthenticated:
          req.cookies.token || req.body.token || req.headers.authorization ? true : false,
      });
    })
    .catch((err) => {
      console.log("HOME CONTROLLER-detail", err);
      next(err);
      //res.sendStatus(500);
      //res.render("error", { message: err });
    });
};

module.exports.index = (req, res, next) => {
  product
    .getAll()
    .then((val) => {
      res.render("home/index", {
        a: val,
        title: "Express",
        isAuthenticated:
          req.cookies.token || req.body.token || req.headers.authorization ? true : false,
      });
    })
    .catch((err) => {
      console.log("HOME CONTROLLER-index", err);
      next(err);
      res.status(500).render("error", { layout: false, message: err });
      //res.render("error", { message: err });
      // res.sendStatus(500);
    });
};
