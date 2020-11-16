const Joi = require("joi");

module.exports.loginValidate = (o) => {
  //console.log(o);
  let loginUser = Joi.object().keys({
    username: Joi.string().alphanum().min(5).max(30).lowercase().required(),
    password: Joi.string().min(5).max(40).required(),
  });
  // let loginEmail = Joi.object().keys({
  //   username: Joi.string().email().min(20).max(30).lowercase().required(),
  //   password: Joi.string().min(5).max(40).required(),
  // });

  // let retEmail = loginEmail.validate(o);
  let retUsr = loginUser.validate(o);
  //console.log("VALIDATE", retUsr || retEmail);
  return retUsr;
};

module.exports.registerValidate = (o) => {
  let register = Joi.object().keys({
    username: Joi.string().alphanum().min(5).max(30).lowercase().required(),
    password: Joi.string().min(5).max(40).required(),
  });
  return register.validate(o);
};
