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

module.exports.profile = (o) => {
  //console.log(chalk.red("validtae"), o);
  let profile = Joi.object().keys({
    fullName: Joi.string().alphanum().min(2).uppercase().required(),
    gender: Joi.boolean().required(),
    address: Joi.string().alphanum().allow("/", " ").required(),
    phoneNumber: Joi.string().regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    ),
    birthDate: Joi.string().isoDate(),
  });
  return profile.validate(o);
};

module.exports.update = (o) => {
  //console.log(chalk.red("validtae"), o);
  let register = Joi.object().keys({
    fullName: Joi.string().alphanum().min(2).uppercase().required(),
    gender: Joi.boolean().default().required(),
    address: Joi.string().alphanum().allow(["/", " "]).required(),
  });
  return register.validate(o);
};

module.exports.create = (o) => {
  let register = Joi.object().keys({
    email: Joi.string().email().min(12).required(),
    username: Joi.string().allow("_").alphanum().min(5).max(30).lowercase().required(),
    password: Joi.string().alphanum().min(5).max(40).required(),
  });
  return register.validate(o);
};
