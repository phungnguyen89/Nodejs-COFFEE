const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const helper = require("../helper");
module.exports.GET = async (req, res) => {};

module.exports.POST = async (req, res) => {
  console.log(chalk.blue("req.body"), req.body);
  return res.status(200).json(helper.stt200());
};
