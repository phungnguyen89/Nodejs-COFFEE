const validate = require("../validates/productInfo");
const helper = require("../helper");
const app = require("../models/app");
const chalk = require("chalk");

module.exports.deleteCheck = async (req, res, next) => {
  let ret = await app.ProductInfo.getById(req.params.id);
  if (ret && ret.imgUrl != "default") {
    try {
      helper.deleteFile(`/images/productInfo/${ret.imgUrl}`);
      return next();
    } catch (err) {
      return res.status(500).json(helper.stt500());
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.updateCheck = (req, res, next) => {
  //validate
  let valid = validate.update(req.body);
  if (valid.error) {
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
    //res.status(400).send("Data entered is not valid. Please try again.");
  }

  //check file
  //console.log(req.file);
  if (req.file) {
    //delete old img
    if (valid.value.imgUrl != "default") {
      try {
        //valid.value.imgUrl ;
        helper.deleteFile(`/images/coffee/${valid.value.imgUrl}`);
      } catch (err) {
        return res.status(500).json(helper.stt500());
      }
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
    let a = valid.value.category.split(",");
    let cates = [];
    for (let i in a) if (a[i]) cates.push(a[i]);
    valid.value.category = cates;
  }

  res.locals.data = valid.value;
  if (req.file) {
    res.locals.data.imgUrl = req.file.filename;
  }

  return next();
};
