const express = require("express");
const {
  getUserMessages,
  seedMessages,
  createUserMessages,
  getAllMessages,
} = require("../controllers/messages");
const router = express.Router();

router.get("/seed", seedMessages);
router.get("/", getAllMessages);
router.get("/:user", getUserMessages);
router.post("/", createUserMessages);

module.exports = router;
