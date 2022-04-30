const { Router } = require("express");
const createUser = require("../controllers/users/createUser");
const editUser = require("../controllers/users/editUser");
const login = require("../controllers/users/login");
const { isAuth } = require("../middlewares/isAuth");
const editUserPassword = require("../controllers/users/editUserPassword");

const router = Router();

router.post("/users", createUser);
router.post("/users/login", login);
router.put("/users/:id", isAuth, editUser);
/* router.get("/users/validate/:code", validateUser); */
router.post("/users/:id/password", isAuth, editUserPassword);

module.exports = router;
