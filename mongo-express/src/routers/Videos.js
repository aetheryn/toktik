const express = require("express");
const { seedVideo, getVideos, addVideos } = require("../controllers/videos");

const router = express.Router();

router.get("/seed", seedVideo);

router.get("/", getVideos);

router.put("/", addVideos);

module.exports = router;
