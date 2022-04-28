const { Router } = require("express");
const { addNews } = require("../controllers/news/addNews");
const { deleteNews } = require("../controllers/news/deleteNews");
const { editNews } = require("../controllers/news/editNews");
const { checkNews } = require("../middlewares/checkNews");
const { isAuth } = require("../middlewares/isAuth");
const getNews = require("../controllers/news/getNews");
const voteNews = require("../controllers/news/voteNews");
const router = Router();

router.get("/news", getNews);
router.post("/news", [isAuth], addNews);
router.post("/news/:id_news/votes", isAuth, voteNews);
router.put("/news/:idNews", [isAuth, checkNews], editNews);
router.delete("/news/:idNews", [isAuth, checkNews], deleteNews);


module.exports = router;
