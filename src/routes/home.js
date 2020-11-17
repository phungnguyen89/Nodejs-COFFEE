const router = require("express").Router();

const home = require("../controllers/home");

/* GET home page. */
router.get("/search:q?", home.search);
router.get("/:p?", home.index);
router.get("/detail/:id?", home.detail);

module.exports = router;
