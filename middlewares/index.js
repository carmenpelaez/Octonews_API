//middlewares
const checkErrors = require("../middlewares/checkErrors");
const isAuth = require("../middlewares/isAuth");
const isComment = require("../middlewares/isComment");
const isNews = require("../middlewares/isNews");
const notFound = require("../middlewares/notFound");

module.exports = {
  ...checkErrors,
  ...isAuth,
  ...isComment,
  ...isNews,
  ...notFound,
};
