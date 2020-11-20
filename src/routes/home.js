const router = require("express").Router();

const home = require("../controllers/home");

/* GET home page. */

router.get("/search:q?", home.search);
router.get("/detail/:id?", home.detail);
router.get("/:p?", home.index);
//router.get("/", home.index);

module.exports = router;
