//sajhskajhkjs
const app = require("../models/app");
const helper = require("../helper");
module.exports.detail = (req, res) => {
  try {
    let ret = app.Coffee.getById(req.params.id);
    if (ret) return res.status(200).render("coffee/detail", { o: val, title: "DETAIL" });
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};

module.exports.index = (req, res) => {
  return res.render("coffee/index", { title: "COFFEE" });
};
