const Joi = require("joi");

module.exports.update = (o) => {
  let schema = Joi.object().keys({
    id: Joi.string().hex().required(),
    name: Joi.string().alphanum().required().allow(" ").uppercase(),
    subname: Joi.string().allow(" "),
    category: Joi.string().required(),
    description: Joi.string().allow(" "),
    imgUrl: Joi.string().required(),
  });
  return schema.validate(o);
};

module.exports.create = (o) => {
  // console.log("createCheck", o);
  let schema = Joi.object().keys({
    name: Joi.string().alphanum().allow(" ").required().uppercase(),
    subname: Joi.string().allow(""),
    description: Joi.string().allow(""),
    img: Joi.string().allow(""),
    category: Joi.string().required(),
  });
  return schema.validate(o);
};
