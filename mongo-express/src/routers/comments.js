const express = require("express");
const router = express.Router();

const { addReplies } = require("../controllers/videos.js");

router.post("/replies/:id", addReplies);

module.exports = router;
