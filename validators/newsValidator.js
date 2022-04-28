const joi = require("@hapi/joi");
const { generateError } = require("../helpers/generateError");

const addNewsSchema = joi.object().keys({
  title: joi
    .string()
    .min(10)
    .max(300)
    .required()
    .error(
      generateError("Must have a title and between 10 and 300 characters", 400)
    ),
  introduction: joi
    .string()
    .min(10)
    .max(500)
    .required()
    .error(
      generateError(
        "Must have a description and between 10 and 500 characters",
        400
      )
    ),
  text: joi
    .string()
    .min(25)
    .max(2000)
    .required()
    .error(
      generateError("Must have a text and between 25 and 2000 characters", 400)
    ),
  category: joi
    .string()
    .required()
    .error(generateError("Must have a category", 400)),
});

const editNewsSchema = joi.object().keys({
  introduction: joi
    .string()
    .min(10)
    .max(500)
    .required()
    .error(
      generateError(
        "Must have a description and between 10 and 500 characters",
        400
      )
    ),
  text: joi
    .string()
    .min(25)
    .max(2000)
    .required()
    .error(
      generateError("Must have a text and between 25 and 2000 characters", 400)
    ),
});

const voteEntrySchema = Joi.object().keys({
  id_user: Joi.number()
    .min(1)
    .error(generateError("El usuario no existe", 400)),
  vote: Joi.number()
    .min(-1)
    .max(1)
    .not(0)
    .required()
    .error(
      generateError(
        "El campo voto debe existir y ser 1 (like) o -1 (dislike)",
        400
      )
    ),
});


module.exports = {
  addNewsSchema,
  editNewsSchema,
  voteEntrySchema
};

