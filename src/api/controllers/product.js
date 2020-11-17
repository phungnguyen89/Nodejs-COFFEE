const product = require("../../models/product");
const helper = require("../../helper");
const chalk = require("chalk");
module.exports.PAGE = async (req, res) => {
  res.send("PAGE");
};

module.exports.DELETE = async (req, res) => {
  try {
    if (req.params.id) {
      let ret = await product.deleteById(req.params.id);
      return res.status(200).json(helper.stt200(ret));
    }
    return res.status(400).json(helper.stt400());
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
};

module.exports.PUT = async (req, res) => {
  try {
    if (req.body.id && Object.getOwnPropertyNames.length > 2) {
      //id and one more info
      let ret = await product.update(req.body);
      return res.status(200).json(helper.stt200(ret));
    }
    return res
      .status(400)
      .json(
        helper.stt400(!req.body.id ? "CAN'T UPDATE WITHOUT IDENTIFICATION" : "EMPTY DATA")
      );
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
};

module.exports.POST = async (req, res) => {
  if (res.locals.data) {
    console.log(chalk.blue("we got product controller"));
    try {
      let ret = await product.create(res.locals.data);
      return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(500).json(helper.stt500());
};

module.exports.GET = async (req, res) => {
  try {
    let ret = req.params.id
      ? await product.getById(req.params.id)
      : await product.getAll();
    return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
};
