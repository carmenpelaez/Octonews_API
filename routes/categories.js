const { Router } = require("express");
const { getCategories } = require("../controllers");

const router = Router();

router.get("/categories", getCategories);

module.exports = router;
