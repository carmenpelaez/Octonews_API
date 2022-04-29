const joi = require("@hapi/joi");
const { generateError } = require("../helpers/generateError");

const createUserSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required()
    .error(generateError("It's not a email", 400)),
  name: joi
    .string()
    .min(3)
    .max(10)
    .required()
    .error(generateError("Name must be between 3 and 10 characters", 400)),
  password: joi
    .string()
    .min(8)
    .required()
    .error(generateError("The password must have at least 8 characters", 400)),
});

module.exports = {
  createUserSchema,
};
