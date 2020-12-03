module.exports.index = async (req, res) => {
  res.status(200).render("cart/index", {
    title: "CART",
    isAuthenticated: req.signedCookies.token ? true : false,
  });
};
