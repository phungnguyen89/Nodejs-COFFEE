const Joi = require("joi");

module.exports.update = (o) => {
  let schema = Joi.object().keys({
    id: Joi.string().hex().required(),
    name: Joi.string()
      .regex(/^(\w+( ?\w)+)$/)
      .min(6)
      .max(50)
      .required()
      .uppercase(),
    subname: Joi.string()
      .regex(/^((\w+( ?\w)*)(, ?)?\w*)*$/)
      .min(6)
      .max(100)
      .allow(" "),
    category: Joi.string().required(),
    description: Joi.string().allow(" "),
    imgUrl: Joi.string().required(),
  });
  return schema.validate(o);
};

module.exports.create = (o) => {
  let schema = Joi.object().keys({
    name: Joi.string()
      .regex(/^(\w+( ?\w)+)$/)
      .min(6)
      .max(50)
      .required()
      .uppercase(),
    subname: Joi.string()
      .regex(/^((\w+( ?\w)*)(, ?)?\w*)*$/)
      .min(6)
      .max(100)
      .allow(""),
    description: Joi.string().allow(""),
    img: Joi.string().allow(""),
    category: Joi.string().required(),
  });
  return schema.validate(o);
};
