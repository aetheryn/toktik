const express = require("express");
const { seedVideo, getVideos } = require("../controllers/videos");

const router = express.Router();

router.get("/seed", seedVideo);

router.get("/", getVideos);

module.exports = router;
