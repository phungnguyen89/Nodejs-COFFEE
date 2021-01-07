const jwt = require("jsonwebtoken");
const app = require("../models/app");

module.exports.authorization = async (req, res, next) => {
  try {
    let token = req.signedCookies.token;
    console.log(token);
    if (!token)
      return res.status(403).render("error", { layout: false, message: "Access Denied" });
    else {
      if (token == req.header.authorization)
        token = token.slice(process.env.TOKEN_SECRECT.length + 1, token);
      let decode = jwt.verify(token, process.env.TOKEN_SECRECT);
      let ret = await app.User.getByUsername(decode.username);
      //console.log(decode.role, ret.role);
      if (ret) {
        if (ret.role == decode.role && ret.role == "admin") {
          return next();
        }
      }
      return res.status(403).render("error", { layout: false, message: "Access Denied" });
    }
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
    // return res.status(500).render("error", { layout: false, message: err });
  }
};

module.exports.auth = async (req, res, next) => {
  try {
    let token = req.signedCookies.token || req.body.token || req.headers.authorization;
    if (!token)
      //return res.status(401).send("Need to login")
      return res.status(401).render("error", { layout: false, message: "Need to Login" });
    else {
      if (token == req.header.authorization)
        token = token.slice(process.env.TOKEN_SECRECT.length + 1, token);
      let decode = jwt.verify(token, process.env.TOKEN_SECRECT);
      let ret = await app.User.getByUsername(decode.username);
      if (!ret) {
        return res
          .status(401)
          .render("error", { layout: false, message: "Invalid TOKEN" });
      }
      return next();
    }
  } catch (err) {
    console.log("auth middleware check", err);
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};
