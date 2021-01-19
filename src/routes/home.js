const router = require("express").Router();

const home = require("../controllers/home");
const auth = require("../middlewares/auth");
const cartMiddle = require("../middlewares/cart");

/* GET home page. */

router.use(cartMiddle.tokenCheck);
router.get("/search:q?", home.search);
router.get("/detail/:id?", home.detail);

router.get("/shop/:p?", home.shop);
router.get("/aboutus", home.aboutus);
router.get("/error/auth", home.auth);
router.get("/error/authorize", home.authorize);
router.get("/", home.index);
//router.get("/", home.index);

module.exports = router;
