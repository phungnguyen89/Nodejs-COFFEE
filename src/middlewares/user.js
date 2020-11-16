const helper = require("../helper");
const app = require("../models/appRepository");
const validate = require("../validates/user");

module.exports.loginCheck = async (req, res, next) => {
  //validtate
  let valid = validate.loginValidate(req.body);
  if (valid.error)
    //return res.status(400).send(valid);
    return res.render("user/login", { error_messages: valid.error.details[0].message });

  //check existing

  try {
    let ret = await app.User.userExisting(valid.value.username);
    //existing 1 or more
    if (ret) {
      valid.value.password = helper.hashPassword(
        valid.value.username,
        valid.value.password
      );
      if (ret.password != valid.value.password)
        //  return res.status(400).send("password incorrect");
        return res.render("user/login", { error_messages: "Password Incorrect" });
      //format value
      res.locals.data = ret;
      return next();
    }
    return res.render("user/login", {
      error_messages: `${valid.value.username} not found `,
    });
    return res.status(400).send(`${valid.value.username} not found `);
  } catch (err) {
    return res.status(500).send(err);
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
  }
};

module.exports.registerCheck = async (req, res, next) => {
  //validate
  let valid = validate.registerValidate(req.body);
  if (valid.error) return res.status(400).send(valid);
  //return res.render("user/register", { error_messages: ret.error.details[0].message });

  // check existing
  try {
    let ret = await app.User.getUserByUsername(valid.value.username);
    if (ret) {
      //console.log("user-services val", val);
      return res.status(400).send(`${ret.username} has been used`);
      //return res.render("user/register", { error_messages: `${val.username} has been used` });
    }
  } catch (err) {
    //console.log("user-services err", err);
    return res.status(500).render("error", { layout: false, message: "SERVER ERROR" });
    return res.status(500).send(err);
  }

  //next();
  valid.value.password = helper.hashPassword(valid.value.username, valid.value.password);
  //format value
  res.locals.data = valid.value;
  return next();
};
