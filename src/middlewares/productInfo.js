const validate = require("../validates/productInfo");
const helper = require("../helper");
const app = require("../models/app");
const chalk = require("chalk");

module.exports.deleteCheck = async (req, res, next) => {
  //console.log(req.params);
  let ret = await app.ProductInfo.getById(req.params.id);
  if (ret) {
    if (ret.imgUrl != "default") {
      try {
        helper.deleteFile(`/images/productInfo/${ret.imgUrl}`);
      } catch (err) {
        return res.status(400).json(helper.stt400("Image not found"));
      }
    }
    return next();
  }
};

module.exports.updateCheck = (req, res, next) => {
  //validate
  let valid = validate.update(req.body);
  if (valid.error)
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  //more than 2 cateogories
  if (valid.value.category.includes(",")) {
    valid.value.category = valid.value.category.split(",");
  }
  if (req.file) {
    if (valid.value.imgUrl != "default") {
      //delete old img

      helper.deleteFile(`/images/productInfo/${valid.value.imgUrl}`);
    }
    valid.value.imgUrl = req.file.filename;
  }
  res.locals.data = valid.value;

  return next();
};

module.exports.createCheck = function (req, res, next) {
  let valid = validate.create(req.body);

  if (valid.error) {
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  }

  //more than 2 cateogories
  if (valid.value.category.includes(",")) {
    valid.value.category = valid.value.category.split(",");
  }

  res.locals.data = valid.value;
  if (req.file) {
    res.locals.data.imgUrl = req.file.filename;
  }

  return next();
};
