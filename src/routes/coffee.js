const router = require("express").Router();
const coffee = require("../controllers/coffee");
//router.use(auth.authorization);
router.route("/detail/:id").get(coffee.detail);
router.route("/").get(coffee.index);

module.exports = router;
