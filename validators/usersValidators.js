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

const editUserSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .max(100)
    .error(generateError("The field email must contain a valid email", 400)),
  name: joi
    .string()
    .min(3)
    .max(10)
    .error(
      generateError("The field name must be between 3 and 10 characters", 400)
    ),
  biography: joi
    .string()
    .max(250)
    .error(
      generateError(
        "The field bio must not contain more than 250 characters",
        400
      )
    ),
  avatar: joi
    .string()
    .max(250)
    .error(
      generateError(
        "The field avatar must be a file path, with a maximum of 250 characters",
        400
      )
    ),
});

const editUserPasswordSchema = joi.object().keys({
  oldPassword: joi
    .string()
    .min(8)
    .required()
    .error(
      generateError(
        "The field oldPassword must exist and contain more than 8 characters",
        400
      )
    ),
  newPassword: joi
    .string()
    .min(8)
    .required()
    .invalid(joi.ref("oldPassword"))
    .error(
      generateError(
        "The field newPassword must exist, be a different password from the old-password and contain more than 8 characters",
        400
      )
    ),
});

const recoverUserPasswordSchema = joi.object().keys({
  email: joi
    .string()
    .email()
    .required()
    .error(generateError("The field email must contain a valid email", 400)),
});

const resetUserPasswordSchema = joi.object().keys({
  recoverCode: joi
    .string()
    .length(40)
    .required()
    .error(
      generateError(
        "The field recoverCode must exist and contain 40 characters",
        400
      )
    ),
  newPassword: joi
    .string()
    .min(8)
    .required()
    .error(
      generateError(
        "The field newPassword must exist, and have more than 8 characters",
        400
      )
    ),
});

module.exports = {
  createUserSchema,
  editUserSchema,
  editUserPasswordSchema,
  recoverUserPasswordSchema,
  resetUserPasswordSchema,
};
