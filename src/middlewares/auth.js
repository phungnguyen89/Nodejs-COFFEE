const jwt = require("jsonwebtoken");
const app = require("../models/appRepository");

module.exports.authorization = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.body.token || req.headers.authorization;
    console.log(token);
    if (!token)
      return res.status(403).render("error", { layout: false, message: "Access Denied" });
    else {
      if (token == req.header.authorization)
        token = token.slice(process.env.TOKEN_SECRECT.length + 1, token);
      let decode = jwt.verify(token, process.env.TOKEN_SECRECT);
      let ret = await app.User.userExisting(decode.username);
      //console.log(decode.role, ret.role);
      if (ret) {
        if (ret.role == decode.role && ret.role == "admin") {
          return next();
        }
      }
      return res.status(400).json({
        error: true,
        status: 403,
        message: "Access Denied",
      });
    }
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
    return res.status(500).render("error", { layout: false, message: err });
    //return res.status(500).send(err);
  }
};

module.exports.auth = async (req, res, next) => {
  try {
    //console.log("auth here");
    let token = req.cookies.token || req.body.token || req.headers.authorization;
    //console.log(token);
    if (!token)
      //return res.status(401).send("Need to login")
      return res.status(500).render("error", { layout: false, message: "Need to Login" });
    else {
      if (token == req.header.authorization)
        token = token.slice(process.env.TOKEN_SECRECT.length + 1, token);
      let decode = jwt.verify(token, process.env.TOKEN_SECRECT);
      let ret = await app.User.userExisting(decode.username);
      if (!ret) {
        return res
          .status(500)
          .render("error", { layout: false, message: "Invalid TOKEN" });
      }
      return next();
    }

    //return res.status(200).send(decode);
  } catch (err) {
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
    return res.status(500).render("error", { layout: false, message: err });
  }

  console.log("req.cookies", req.cookies);
  console.log("req.body", req.body);
  console.log("req.headers", req.headers);
  let o = {
    reqToken: req.cookies.token,
    reqBody: req.body.token,
    headerAuthorize: req.headers.authorization,
  };

  res.status(400).json(o);
};
