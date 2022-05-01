const { Router } = require("express");
const editUser = require("../controllers/users/editUser");
const { isAuth } = require("../middlewares");
const { newUser, loginUser } = require("../controllers");
const validateUser = require("../controllers/users/validateUser");
const editUserPassword = require("../controllers/users/editUserPassword");
const recoverUserPassword = require("../controllers/users/recoverUserPassword");
const resetUserPassword = require("../controllers/users/resetPassword");

const router = Router();

router.post("/users", newUser);
router.post("/users/login", loginUser);
router.put("/users/:id", isAuth, editUser);
router.get("/users/validate/:code", validateUser);
router.post("/users/:id/password", isAuth, editUserPassword);
router.post("/users/recover-password", recoverUserPassword);
router.get("/users/reset-password", resetUserPassword);

module.exports = router;
