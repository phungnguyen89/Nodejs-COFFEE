const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/images/products" });
const middle = require("../middlewares/product");
const product = require("../controllers/product");
const auth = require("../middlewares/auth");
router.use(auth.authorization);
router
  .route("/detail/:id")
  .get(product.detail)
  .post(upload.single("img"), middle.updateCheck, product.update);

router.get("/delete/:id", middle.deleteCheck, product.delete);

router
  .route("/create")
  .get((req, res) => {
    res.render("product/create");
  })
  .post(upload.single("img"), middle.createCheck, product.create);
router.route("/").get(product.index);

module.exports = router;
