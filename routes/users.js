const { Router } = require("express");
const { isAuth } = require("../middlewares");
const {
  newUser,
  loginUser,
  validateUser,
  editUserPassword,
  editUser,
  recoverUserPassword,
  resetPassword,
} = require("../controllers");

const router = Router();

router.post("/users", newUser);
router.post("/users/login", loginUser);
router.put("/users/:id", [isAuth], editUser);
router.get("/users/validate/:code", validateUser);
router.post("/users/:id/password", [isAuth], editUserPassword);
router.post("/users/recover-password", recoverUserPassword);
router.get("/users/reset-password", resetPassword);

module.exports = router;
