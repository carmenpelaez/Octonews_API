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
  getMyUser,
  getAnUserInformation,
} = require("../controllers");

const router = Router();

router.get("/user", [isAuth], getMyUser);
router.get("/users/:id", getAnUserInformation);
router.post("/users", newUser);
router.post("/users/login", loginUser);
router.put("/users/:id", [isAuth], editUser);
router.get("/users/validate/:code", validateUser);
router.post("/users/:id/password", [isAuth], editUserPassword);
router.post("/users/recover-password", recoverUserPassword);
router.post("/users/reset-password", resetPassword);

module.exports = router;
