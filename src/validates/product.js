const Joi = require("joi");

module.exports.update = (o) => {
  let schema = Joi.object().keys({
    id: Joi.string().hex().required(),
    name: Joi.string().required().uppercase(),
    quote: Joi.string().allow(""),
    description: Joi.string().allow(""),
    imgUrl: Joi.string().required(),
  });
  return schema.validate(o);
};

module.exports.create = (o) => {
  console.log("createCheck", o);
  let schema = Joi.object().keys({
    name: Joi.string().required().uppercase(),
    quote: Joi.string().allow(""),
    description: Joi.string().allow(""),
    img: Joi.string().allow(""),
  });
  return schema.validate(o);
};
