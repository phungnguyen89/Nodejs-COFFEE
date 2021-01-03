const router = require("express").Router();

const productInfo = require("../controllers/productInfo");

const product = require("../controllers/product");
const category = require("../controllers/category");
const user = require("../controllers/user");
//router.use(require("../middlewares/auth").authorization);

router.route("/product/info/:id?").get(productInfo.index).post().put().delete();
router.route("/product/:id?").get(product.index).post().put().delete();
router.route("/category/:id?").get(category.index).post().put().delete();
router.route("/user/:id?").get().post().put().delete();
router
  .route("/dashboard")
  .get(require("../middlewares/auth").authorization, user.dashboard);
module.exports = router;
