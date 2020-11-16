const validate = require("../validates/product");
const helper = require("../helper");
const app = require("../models/appRepository");
module.exports.updateCheck = (req, res, next) => {
  //validate
  let valid = validate.update(req.body);
  if (valid.error) {
    res.status(400).json(helper.stt400(valid.error.details[0].message));
    //res.status(400).send("Data entered is not valid. Please try again.");
  }

  //check file
  //console.log(req.file);
  if (req.file) {
    //delete old img
    if (valid.value.imgUrl != "default") {
      try {
        //valid.value.imgUrl ;
        helper.deleteFile(`/images/products/${valid.value.imgUrl}`);
      } catch (err) {
        return res.status(500).render("error", { layout: false, message: err });
        return res
          .status(500)
          .render("error", { layout: false, message: "SERVER ERROR" });
      }
    }

    valid.value.imgUrl = req.file.filename;
  }

  res.locals.data = valid.value;
  return next();
};

module.exports.deleteCheck = async (req, res, next) => {
  let ret = await app.Product.getById(req.params.id);
  if (ret && ret.imgUrl != "default") {
    try {
      helper.deleteFile(`/images/products/${ret.imgUrl}`);
      return next();
    } catch (err) {
      return res.status(400).render("error", { layout: false, message: err });
    }
  }
};

module.exports.createCheck = function (req, res, next) {
  let valid = validate.create(req.body);
  //console.log("middleware", req.body);
  if (valid.error) {
    console.log("error middleware", valid.error.details[0].message);
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
    //res.status(400).send("Data entered is not valid. Please try again.");
  }
  console.log("next error");
  res.locals.data = valid.value;

  if (req.file) {
    // console.log("has file");
    res.locals.data.imgUrl = req.file.filename;
  }

  return next();
};
