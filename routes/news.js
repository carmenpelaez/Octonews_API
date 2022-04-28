const { Router } = require("express");
const { addNews } = require("../controllers/news/addNews");
const { deleteNews } = require("../controllers/news/deleteNews");
const { editNews } = require("../controllers/news/editNews");
const { checkNews } = require("../middlewares/checkNews");
const { isAuth } = require("../middlewares/isAuth");

const router = Router();

router.post("/news", [isAuth], addNews);
router.put("/news/:idNews", [isAuth, checkNews], editNews);
router.delete("/news/:idNews", [isAuth, checkNews], deleteNews);

module.exports = router;
