const router = require("express").Router();

const user = require("../controllers/user");
const middle = require("../middlewares/user");
/* GET users listing. */

router.route("/logout").get(user.logout).post(user.logout);

router.route("/login").get(user.login);

router.route("/register").get(user.register);

module.exports = router;
