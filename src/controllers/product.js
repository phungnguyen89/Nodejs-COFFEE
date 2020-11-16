//sajhskajhkjs
const app = require("../models/appRepository");

module.exports.update = (req, res) => {
  if (res.locals.data) {
    app.Product.update(res.locals.data)
      .then((val) => {
        res.status(200).redirect("/product");
      })
      .catch((err) => {
        res.status(400).render("error", { layout: false, message: "SERVER ERROR" });
      });
  } else {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};

module.exports.detail = (req, res) => {
  app.Product.getById(req.params.id).then((val) => {
    res.render("product/detail", { o: val, title: "DETAIL" });
  });
};

module.exports.delete = (req, res) => {
  //res.send(req.params.id);
  app.Product.deleteById(req.params.id)
    .then((val) => {
      //console.log("product controller", val);
      res.status(200).redirect("/product");
    })
    .catch((err) => {
      res
        .status(500)
        .render("error", { layout: false, title: "ERROR", message: "SERVER ERROR" });
    });
};

module.exports.create = (req, res) => {
  if (res.locals.data) {
    console.log(res.locals.data);
    app.Product.create(res.locals.data)
      .then((val) => {
        console.log("product CONTROLLER-create---", val);
        res.status(200).redirect("/product");
      })
      .catch((err) => {
        res
          .status(500)
          .render("error", { layout: false, title: "ERROR", message: "SERVER ERROR" });
      });
  } else {
    return res
      .status(500)
      .render("error", { layout: false, title: "ERROR", message: "SERVER ERROR" });
  }
};

module.exports.index = (req, res) => {
  return res.render("product/index", { title: "PRODUCT" });
  app.Product.getProducts()
    .then((val) => {
      res.render("product/index", { a: val, title: "PRODUCT" });
    })
    .catch((err) => {
      res
        .status(500)
        .render("error", { layout: false, title: "ERROR", message: "SERVER ERROR" });
    });
};
