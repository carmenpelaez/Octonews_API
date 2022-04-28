const { Router } = require("express");
const { addNews } = require("../controllers/news/addNews");
const { deleteNews } = require("../controllers/news/deleteNews");
const { editNews } = require("../controllers/news/editNews");
const { isAuth } = require("../middlewares/isAuth");

const router = Router();

router.post("/news", [isAuth], addNews);
router.put("/news/:idNews", [isAuth], editNews);
router.delete("/news/:idNews", [isAuth], deleteNews);

module.exports = router;
