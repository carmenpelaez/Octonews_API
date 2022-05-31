//Users controllers
const createUser = require("../controllers/users/createUser");
const getMyUser = require("../controllers/users/getMyUser");
const editUser = require("../controllers/users/editUser");
const editUserPassword = require("../controllers/users/editUserPassword");
const login = require("../controllers/users/login");
const recoverUserPassword = require("../controllers/users/recoverUserPassword");
const resetPassword = require("../controllers/users/resetPassword");
const validateUser = require("../controllers/users/validateUser");
//News controllers
const addNews = require("../controllers/news/addNews");
const deleteNews = require("../controllers/news/deleteNews");
const editNews = require("../controllers/news/editNews");
const getNews = require("../controllers/news/getNews");
const voteNews = require("../controllers/news/voteNews");
//Comments controllers
const addComment = require("../controllers/news/comments/addComment");
const deleteComment = require("../controllers/news/comments/deleteComment");
const replyComment = require("../controllers/news/comments/replyComment");
const getComments = require("../controllers/news/comments/getComments");
//Categories controllers
const getCategories = require("../controllers/categories/getCategories");

module.exports = {
  ...createUser,
  ...editUser,
  ...editUserPassword,
  ...login,
  ...recoverUserPassword,
  ...resetPassword,
  ...validateUser,
  ...addNews,
  ...deleteNews,
  ...editNews,
  ...getNews,
  ...voteNews,
  ...addComment,
  ...deleteComment,
  ...replyComment,
  ...getComments,
  ...getCategories,
  ...getMyUser,
};
