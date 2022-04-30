//Users controllers
const createUser = require("../controllers/users/createUser");
const login = require("../controllers/users/login");
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

module.exports = {
  ...createUser,
  ...login,
  ...addNews,
  ...deleteNews,
  ...editNews,
  ...getNews,
  ...voteNews,
  ...addComment,
  ...deleteComment,
  ...replyComment,
};
