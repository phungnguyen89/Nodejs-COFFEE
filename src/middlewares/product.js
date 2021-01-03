const validate = require("../validates/product");
const chalk = require("chalk");
const helper = require("../helper");
module.exports.updateCheck = (req, res, next) => {
  let valid = validate.update(req.body);
  // console.log(req.body);
  if (valid.error)
    return res.status(400).json(helper.stt400(valid.error.details[0].message));

  res.locals.data = valid.value;

  return next();
};

module.exports.createCheck = async (req, res, next) => {
  console.log(chalk.blue("product middle"), req.body);
  let valid = validate.create(req.body);

  if (valid.error) {
    return res.status(400).json(helper.stt400(valid.error.details[0].message));
  }

  res.locals.data = valid.value;

  return next();
};
