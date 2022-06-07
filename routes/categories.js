const { Router } = require("express");
const { getCategories, getCurrentCategory } = require("../controllers");

const router = Router();

router.get("/categories", getCategories);
router.get("/categories/:idCategory", getCurrentCategory);

module.exports = router;
