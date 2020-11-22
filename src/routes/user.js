const router = require("express").Router();

const user = require("../controllers/user");
const middle = require("../middlewares/user");
/* GET users listing. */

router.get("/dashboard", (req, res) => {
  res.render("user/dashboard", {
    isAuthenticated: signedCookies.token ? true : false,
  });
});

router.post("/logout", user.logout);

router
  .route("/login")
  .get((req, res) => {
    res.render("user/login");
  })
  .post(middle.loginCheck, user.login);

router.route("/register").get((req, res) => {
  res.render("user/register");
});

module.exports = router;
