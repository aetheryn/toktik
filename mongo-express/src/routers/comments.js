const express = require("express");
const router = express.Router();

const {
  addReplies,
  addComments,
  deleteComments,
} = require("../controllers/videos.js");

router.post("/replies/:id", addReplies);
router.put("/:id", addComments);
router.delete("/:id", deleteComments);

module.exports = router;
