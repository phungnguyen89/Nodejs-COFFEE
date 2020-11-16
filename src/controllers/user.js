const user = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports.login = async (req, res) => {
  //set the token
  if (res.locals.data) {
    let payload = {
      username: res.locals.data.username,
      name: res.locals.data.profile.fullName,
      role: res.locals.data.role,
    };

    let token = jwt.sign(payload, process.env.TOKEN_SECRECT, {
      expiresIn: `${1000 * 60 * 10}`,
    });
    res.cookie("token", token, { maxAge: 1000 * 60 * 10 });
    res.header("Authorization", token);
    //console.log("controller-here", token, res.cookies);

    return res.status(200).redirect("/user/dashboard");
    return res.status(200).json({
      status: 200,
      token: token,
    });
  }
};

module.exports.register = (req, res) => {
  //consoleres.send("controller here");
  //console.log(req.body);
  //console.log("res local", res.locals.data);
  if (res.locals.data) {
    user
      .create(res.locals.data)
      .then((val) => {
        console.log("USER CONTROLLER---register", val);
        //res.redirect("/user/login");
        res.status(200).send(val);
      })
      .catch((err) => {
        //console.log("why erro here", err);
        //console.log("USER CONTRLLER---register", err);
        //next(err);
        res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
        res.status(500).send(err);
      });
  } else {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};
