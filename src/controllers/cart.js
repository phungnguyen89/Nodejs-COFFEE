const helper = require("../helper");
module.exports.index = async (req, res) => {
  res.status(200).render("cart/index", {
    title: "CART",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
};
