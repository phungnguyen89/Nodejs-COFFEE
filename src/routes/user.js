const router = require("express").Router();

const user = require("../controllers/user");
const middle = require("../middlewares/user");
/* GET users listing. */

router.get("/dashboard", (req, res) => {
  res.render("user/dashboard", {
    isAuthenticated:
      req.cookies.token || req.body.token || req.headers.authorization ? true : false,
  });
});

router
  .route("/login")
  .get((req, res) => {
    res.render("user/login");
  })
  .post(middle.loginCheck, user.login);

router
  .route("/register")
  .get((req, res) => {
    res.render("user/register");
    //res.render("user/register", { partials: false, layout: false });
  })
  .post(middle.registerCheck, user.register);

module.exports = router;
