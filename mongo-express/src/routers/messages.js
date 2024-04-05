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
router.post("/:user", getUserMessages);
router.put("/", createUserMessages);

module.exports = router;
