const express = require("express");
const router = express.Router();

const {
  addReplies,
  addComments,
  deleteComments,
  deleteReply,
} = require("../controllers/videos.js");

router.post("/replies/:id", addReplies);
router.put("/:id", addComments);
router.delete("/:id", deleteReply);
router.patch("/delete/:id", deleteComments);

module.exports = router;
