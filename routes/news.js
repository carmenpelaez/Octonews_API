const { Router } = require("express");
const { isNews, isAuth, isComment } = require("../middlewares");
const {
  addNews,
  deleteNews,
  editNews,
  getNews,
  getSingleNews,
  voteNews,
  addComment,
  replyComment,
  deleteComment,
  getComments,
  getNewsVotes,
} = require("../controllers/index");

const router = Router();

// News endpoints
router.get("/news", getNews);
router.get("/news/:id", getSingleNews);
router.post("/news", [isAuth], addNews);
router.get("/news/:idNews/votes", [isNews], getNewsVotes);
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
