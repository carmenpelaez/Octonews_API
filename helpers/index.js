//helpers
const deleteImage = require("../helpers/deleteImage");
const generateError = require("../helpers/generateError");
const JWTGenerator = require("../helpers/JWTGenerator");
const processAndSaveImage = require("../helpers/processAndSaveImage");
const randomString = require("../helpers/randomString");
const sendMail = require("../helpers/sendMail");

module.exports = {
  ...deleteImage,
  ...generateError,
  ...JWTGenerator,
  ...processAndSaveImage,
  ...randomString,
  ...sendMail,
};
