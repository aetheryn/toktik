const express = require("express");
const router = express.Router();

const {
  seedUsers,
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");

router.get("/seed", seedUsers);
router.get("/users", getAllUsers);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
