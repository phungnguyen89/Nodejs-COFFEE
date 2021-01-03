module.exports.index = (req, res) => {
  return res.status(200).render("product/index", {
    title: "PRODUCT-ADMIN",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
  return res.render("product/index", { title: "PRODUCT" });
};
