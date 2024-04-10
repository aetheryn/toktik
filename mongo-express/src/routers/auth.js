const express = require("express");
const router = express.Router();

const {
  seedUsers,
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const {
  validateRegistration,
  validateLogin,
  validateRefreshToken,
} = require("../validators/auth");
const { errorCheck } = require("../validators/errorCheck");

router.get("/seed", seedUsers);
router.get("/users", getAllUsers);
router.put("/register", validateRegistration, errorCheck, register);
router.post("/login", validateLogin, errorCheck, login);
router.post("/refresh", validateRefreshToken, errorCheck, refresh);

module.exports = router;
