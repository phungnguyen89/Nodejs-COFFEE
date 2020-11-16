const router = require("express").Router();
const auth = require("../middlewares/auth");

router.use(auth.auth);
router.route("/").get((req, res) => {
  res.send("CART HERE");
});

module.exports = router;
