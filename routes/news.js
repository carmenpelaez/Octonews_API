const { Router } = require("express");
const { isNews, isAuth, isComment } = require("../middlewares");
const {
  addNews,
  deleteNews,
  editNews,
  getNews,
  voteNews,
  addComment,
  replyComment,
  deleteComment,
  getComments,
} = require("../controllers/index");

const router = Router();

// News endpoints
router.get("/news", getNews);
router.post("/news", [isAuth], addNews);
router.post("/news/:idNews/votes", [isAuth, isNews], voteNews);
router.put("/news/:idNews", [isAuth, isNews], editNews);
router.delete("/news/:idNews", [isAuth, isNews], deleteNews);

// News/comments Endpoints
router.get("/news/:idNews/comments", [isNews], getComments);
router.post("/news/:idNews/comment", [isAuth, isNews], addComment);
router.post(
  "/news/:idNews/:idComment/reply",
  [isAuth, isNews, isComment],
  replyComment
);
router.delete("/news/:idNews/:idComment", [isAuth, isComment], deleteComment);

module.exports = router;
