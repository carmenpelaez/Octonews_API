const { Router } = require("express");
const { newUser, loginUser } = require("../controllers");

const router = Router();

router.post("/users", newUser);
router.post("/users/login", loginUser);

module.exports = router;
