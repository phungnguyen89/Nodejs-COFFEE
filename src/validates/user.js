const Joi = require("joi");
const chalk = require("chalk");
module.exports.login = (o) => {
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

module.exports.update = (o) => {
  //console.log(chalk.red("validtae"), o);
  let register = Joi.object().keys({
    username: Joi.string().alphanum().min(5).max(30).lowercase().required(),
    password: Joi.string().min(5).max(40).required(),
    email: Joi.string().email().min(15).max(60).required(),
    profile: {
      fullName: Joi.string().alphanum().min(2).uppercase().required(),
      gender: Joi.boolean().default(true),
    },
  });
  return register.validate(o);
};

module.exports.create = (o) => {
  let register = Joi.object().keys({
    username: Joi.string().allow("_").alphanum().min(5).max(30).lowercase().required(),
    password: Joi.string().alphanum().min(5).max(40).required(),
  });
  return register.validate(o);
};
