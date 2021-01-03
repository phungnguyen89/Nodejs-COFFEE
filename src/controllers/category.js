module.exports.index = (req, res) => {
  return res.status(200).render("category/index", {
    title: "PRODUCT-ADMIN",
    isAuthenticated: helper.valueToken(req.signedCookies.token).username ? true : false,
  });
  return res.render("category/index", { title: "CATEGORY" });
};
