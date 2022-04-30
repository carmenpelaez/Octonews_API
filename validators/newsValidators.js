const joi = require("@hapi/joi");
const { generateError } = require("../helpers/generateError");

const addNewsSchema = joi.object().keys({
  title: joi
    .string()
    .min(10)
    .max(300)
    .required()
    .error(
      generateError(
        "Must have a 'title' and between 10 and 300 characters",
        400
      )
    ),
  introduction: joi
    .string()
    .min(10)
    .max(500)
    .required()
    .error(
      generateError(
        "Must have a 'introduction' and between 10 and 500 characters",
        400
      )
    ),
  text: joi
    .string()
    .min(25)
    .max(5000)
    .required()
    .error(
      generateError(
        "Must have a 'text' and between 25 and 2000 characters",
        400
      )
    ),
  category: joi
    .string()
    .required()
    .error(generateError("Must have a 'category'", 400)),
});

const editNewsSchema = joi.object().keys({
  introduction: joi
    .string()
    .min(10)
    .max(500)
    .required()
    .error(
      generateError(
        "Must have a 'introduction' and between 10 and 500 characters",
        400
      )
    ),
  text: joi
    .string()
    .min(25)
    .max(2000)
    .required()
    .error(
      generateError(
        "Must have a 'text' and between 25 and 2000 characters",
        400
      )
    ),
});

const voteEntrySchema = joi.object().keys({
  id_user: joi.number().min(1).error(generateError("User doesn't exist", 400)),
  vote: joi
    .number()
    .min(-1)
    .max(1)
    .required()
    .error(
      generateError(
        "The field 'vote' must exist and be 1 (like), 0 (neutral) or -1 (dislike)",
        400
      )
    ),
});

const addCommentSchema = joi.object().keys({
  comment: joi
    .string()
    .min(1)
    .max(2000)
    .required()
    .error(
      generateError(
        "Must write a 'comment' in a range of 1 to 2000 characters",
        400
      )
    ),
});

module.exports = {
  addNewsSchema,
  editNewsSchema,
  voteEntrySchema,
  addCommentSchema,
};
