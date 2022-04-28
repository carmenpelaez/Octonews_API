const Joi = require("@hapi/joi");
const { generateError } = require("../helpers/generateError");

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

module.exports = { voteEntrySchema };
