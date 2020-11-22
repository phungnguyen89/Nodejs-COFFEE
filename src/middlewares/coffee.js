const validate = require("../validates/coffee");
const helper = require("../helper");
const app = require("../models/app");
const chalk = require("chalk");
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
  let ret = await app.Coffee.getById(req.params.id);
  if (ret && ret.imgUrl != "default") {
    try {
      helper.deleteFile(`/images/coffee/${ret.imgUrl}`);
      return next();
    } catch (err) {
      return res.status(400).render("error", { layout: false, message: err });
    }
  }
};

module.exports.createCheck = function (req, res, next) {
  let valid = validate.create(req.body);
  //console.log(chalk.blue("middleware"), req.body);
  if (valid.error) {
    console.log(chalk.red("valid error"));
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
    //res.status(400).send("Data entered is not valid. Please try again.");
  }

  //console.log(chalk.blue("req body"), req.body);
  // console.log(chalk.blue("req file"), req.file);

  res.locals.data = valid.value;
  //console.log("has file", req.file);
  if (req.file) {
    res.locals.data.imgUrl = req.file.filename;
  }

  return next();
};
