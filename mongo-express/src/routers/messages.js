const express = require("express");
const {
  getUserMessages,
  seedMessages,
  createUserMessages,
  getAllMessages,
  updateReadMessages,
} = require("../controllers/messages");
const { authContentModerator, authUser } = require("../middleware/auth");
const router = express.Router();

router.get("/seed", authContentModerator, seedMessages);
router.get("/", authUser, getAllMessages);
router.post("/:user", authUser, getUserMessages);
router.put("/", authUser, createUserMessages);
router.patch("/", authUser, updateReadMessages);

module.exports = router;
