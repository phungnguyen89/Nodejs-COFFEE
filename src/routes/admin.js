const router = require("express").Router();

const productInfo = require("../controllers/productInfo");
// const product = require("../controllers/product");
//router.use(require("../middlewares/auth").authorization);

router.route("/").get();
router.route("/product/info/:id?").get(productInfo.index).post().put().delete();
router.route("/product/:id?").get().post().put().delete();
router.route("/category/:id?").get().post().put().delete();
router.route("/user/:id?").get().post().put().delete();
module.exports = router;
