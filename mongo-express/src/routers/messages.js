const express = require("express");
const {
  getUserMessages,
  seedMessages,
  createUserMessages,
  getAllMessages,
  updateReadMessages,
} = require("../controllers/messages");
const router = express.Router();

router.get("/seed", seedMessages);
router.get("/", getAllMessages);
router.post("/:user", getUserMessages);
router.put("/", createUserMessages);
router.patch("/", updateReadMessages);

module.exports = router;
