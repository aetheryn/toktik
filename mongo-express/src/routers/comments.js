const express = require("express");
const router = express.Router();

const { addReplies, addComments } = require("../controllers/videos.js");
const { authUser } = require("../middleware/auth.js");

router.post("/replies/:id", authUser, addReplies);
router.put("/:id", authUser, addComments);

module.exports = router;
