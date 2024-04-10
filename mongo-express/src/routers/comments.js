const express = require("express");
const router = express.Router();

const { authUser } = require("../middleware/auth.js");

const {
  addReplies,
  addComments,
  deleteComments,
} = require("../controllers/videos.js");

router.post("/replies/:id", authUser, addReplies);
router.put("/:id", authUser, addComments);
router.delete("/:id", deleteComments);

module.exports = router;
