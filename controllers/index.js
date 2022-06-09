//Users controllers
const createUser = require("../controllers/users/createUser");
const getMyUser = require("../controllers/users/getMyUser");
const getAnUserInformation = require("../controllers/users/getAnUserInformation");
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
const getSingleNews = require("../controllers/news/getSingleNews");
const voteNews = require("../controllers/news/voteNews");
const getNewsVotes = require("../controllers/news/getNewsVotes");
//Comments controllers
const addComment = require("../controllers/news/comments/addComment");
const deleteComment = require("../controllers/news/comments/deleteComment");
const replyComment = require("../controllers/news/comments/replyComment");
const getComments = require("../controllers/news/comments/getComments");
//Categories controllers
const getCategories = require("../controllers/categories/getCategories");
const getCurrentCategory = require("../controllers/categories/getCurrentCategory");

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
  ...getSingleNews,
  ...getNewsVotes,
  ...voteNews,
  ...addComment,
  ...deleteComment,
  ...replyComment,
  ...getComments,
  ...getCategories,
  ...getCurrentCategory,
  ...getMyUser,
  ...getAnUserInformation,
};
