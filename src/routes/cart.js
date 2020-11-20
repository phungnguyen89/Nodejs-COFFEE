const router = require("express").Router();
const auth = require("../middlewares/auth");

//router.use(auth.auth);
router.route("/").get((req, res) => {
  res.status(200).render("cart/index", {
    title: "CART",
    isAuthenticated: req.signedCookies.token ? true : false,
  });
});

module.exports = router;
