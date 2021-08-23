const helper = require("../helper");

module.exports.index1 = (req, res) => {
  return res.status(200).render("category/index1", {
    title: "PRODUCT-ADMIN",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};
