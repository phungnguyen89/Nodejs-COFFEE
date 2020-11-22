const router = require("express").Router();
const auth = require("../middlewares/auth");
const app = require("../models/app");
//router.use(auth.auth);
router.route("/").get(async (req, res) => {
  //console.log("Cart here");
  //let ret = await app.Cart.getByToken(req.signedCookies.token);
  //console.log(ret);
  res.status(200).render("cart/index", {
    title: "CART",
    isAuthenticated: req.signedCookies.token ? true : false,
  });
});

module.exports = router;
