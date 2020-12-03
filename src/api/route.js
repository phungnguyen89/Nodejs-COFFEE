const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/images/productInfo" });
//middlewares
const productInfoMiddle = require("../middlewares/productInfo");
const userMiddle = require("../middlewares/user");
const auth = require("../middlewares/auth");
const categoryMiddle = require("../middlewares/category");
//controllers
const product = require("./controllers/product");
const productInfo = require("./controllers/productInfo");
const category = require("./controllers/category");
const user = require("./controllers/user");
const cart = require("./controllers/cart");
//home
router.get("/detail/:id?", productInfo.GET);
router.get("/page/:p?", productInfo.PAGE);
router.post("/register", userMiddle.registerCheck, user.POST);
router.post("/login", userMiddle.loginCheck, user.LOGIN);

//cart
//router.use(auth.auth);
router
  .route("/cart/:id?")
  .get(cart.GET)
  .post(cart.POST)
  .put(cart.PUT)
  .delete(cart.DELETE);

//user manage
//router.use(auth.authorization);
router
  .route("/user/:id?")
  .get(user.GET)
  .post(userMiddle.registerCheck, user.POST)
  .put(userMiddle.updateCheck, user.PUT)
  .delete(user.DELETE);
//manage product
router.route("/product/:id?");
//manage productInfo
router
  .route("/product/info/:id?")
  .get(productInfo.GET)
  .post(upload.single("img"), productInfoMiddle.createCheck, productInfo.POST)
  .put(upload.single("img"), productInfoMiddle.updateCheck, productInfo.PUT)
  .delete(productInfoMiddle.deleteCheck, productInfo.DELETE);
//manage category
router
  .route("/category/:id?")
  .get(category.GET)
  .post(categoryMiddle.createCheck, category.POST)
  .put(categoryMiddle.updateCheck, category.PUT)
  .delete(category.DELETE);

module.exports = router;
