const { Router } = require("express");
const editUser = require("../controllers/users/editUser");
const { isAuth } = require("../middlewares");
const editUserPassword = require("../controllers/users/editUserPassword");
const { newUser, loginUser } = require("../controllers");

const router = Router();

router.post("/users", newUser);
router.post("/users/login", loginUser);
router.put("/users/:id", isAuth, editUser);
/* router.get("/users/validate/:code", validateUser); */
router.post("/users/:id/password", isAuth, editUserPassword);

module.exports = router;
