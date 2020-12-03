const Joi = require("joi");
const chalk = require("chalk");

module.exports.update = (o) => {
  let schema = Joi.object().keys({
    id: Joi.string().hex().required(),
    name: Joi.string().required().min(3).uppercase(),
  });
  return schema.validate(o);
};

module.exports.create = (o) => {
  let schema = Joi.object().keys({
    name: Joi.string().required().min(3).uppercase(),
  });
  return schema.validate(o);
};
