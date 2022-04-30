//helpers
const deleteImage = require("../helpers/deleteImage");
const generateError = require("../helpers/generateError");
const JWTGenerator = require("../helpers/JWTGenerator");
const processAndSaveImage = require("../helpers/processAndSaveImage");

module.exports = {
  ...deleteImage,
  ...generateError,
  ...JWTGenerator,
  ...processAndSaveImage,
};
