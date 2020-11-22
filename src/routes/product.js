const router = require("express").Router();
const product = require("../controllers/product");
//router.use(auth.authorization);
router.route("/detail/:id").get(product.detail);

router.route("/").get(product.index);

module.exports = router;
