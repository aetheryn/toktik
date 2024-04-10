const express = require("express");
const router = express.Router();

const { addReplies, addComments } = require("../controllers/videos.js");

router.post("/replies/:id", addReplies);
router.put("/:id", addComments);

module.exports = router;
