const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/images/coffee" });
//middlewares
const coffeeMiddle = require("../middlewares/coffee");
const userMiddle = require("../middlewares/user");
const auth = require("../middlewares/auth");
//controllers
const coffee = require("./controllers/coffee");
const user = require("./controllers/user");
const cart = require("./controllers/cart");
//home
router.get("/detail/:id?", coffee.GET);
router.get("/page/:p?", coffee.PAGE);
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

//manage coffee
router
  .route("/coffee/:id?")
  .get(coffee.GET)
  .post(upload.single("img"), coffeeMiddle.createCheck, coffee.POST)
  .put(upload.single("img"), coffeeMiddle.updateCheck, coffee.PUT)
  .delete(coffee.DELETE);
module.exports = router;
