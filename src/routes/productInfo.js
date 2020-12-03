const router = require("express").Router();
const productInfo = require("../controllers/productInfo");
//router.use(auth.authorization);
router.route("/detail/:id").get(productInfo.detail);
router.route("/").get(productInfo.index);

module.exports = router;
