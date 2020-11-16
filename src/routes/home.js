const router = require("express").Router();

const home = require("../controllers/home");

/* GET home page. */
router.get("/detail/:id", home.detail);
router.get("/", home.index);
router.get("/test", (req, res) => {
  res.render("product/index1", {
    isAuthenticated:
      req.cookies.token || req.body.token || req.headers.authorization ? true : false,
  });
});

module.exports = router;
