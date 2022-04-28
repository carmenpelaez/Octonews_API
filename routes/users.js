const { Router } = require("express");
const createUser = require("./controllers/users/createUser");
const login = require("./controllers/users/login");

const router = Router();

router.post("/users", createUser);
router.post("/users/login", login);

module.exports = router;
