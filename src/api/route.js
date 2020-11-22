const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/images/products" });
//middlewares
const productMiddle = require("../middlewares/product");
const userMiddle = require("../middlewares/user");
const auth = require("../middlewares/auth");
//controllers
const product = require("./controllers/product");
const user = require("./controllers/user");

//home
router.get("/detail/:id?", product.GET);
router.get("/page/:p?", product.PAGE);
router.post("/register", userMiddle.registerCheck, user.POST);
router.post("/login", userMiddle.loginCheck, user.LOGIN);

//cart
//router.use(auth.auth);
router.route("/cart/:id?").get().post().put().delete();

//user manage
//router.use(auth.authorization);
router
  .route("/user/:id?")
  .get(user.GET)
  .post(userMiddle.registerCheck, user.POST)
  .put(userMiddle.updateCheck, user.PUT)
  .delete(user.DELETE);

//manage product
router
  .route("/product/:id?")
  .get(product.GET)
  .post(upload.single("img"), productMiddle.createCheck, product.POST)
  .put(upload.single("img"), productMiddle.updateCheck, product.PUT)
  .delete(product.DELETE);
module.exports = router;
