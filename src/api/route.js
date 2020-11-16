const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/images/products" });
const middle = require("../middlewares/product");

const auth = require("../middlewares/auth");

const product = require("./controllers/product");

//router.use(auth.authorization);
//router.get("/product/:p?", product.PAGE);
router
  .route("/product/:id?")
  .get(product.GET)
  .post(upload.single("img"), middle.createCheck, product.POST)
  .put(product.PUT)
  .delete(product.DELETE);

// router
//   .route("/detail/:id")
//   .get(product.detail)
//   .post(upload.single("img"), middle.updateCheck, product.update);

// router.get("/delete/:id", middle.deleteCheck, product.delete);

// router
//   .route("/create")
//   .get((req, res) => {
//     res.render("product/create");
//   })
//   .post(upload.single("img"), middle.createCheck, product.create);
// router.route("/").get(product.index);
module.exports = router;
