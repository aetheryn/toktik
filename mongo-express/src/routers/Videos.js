const express = require("express");
const {
  seedVideo,
  getVideos,
  addVideos,
  updateVideo,
} = require("../controllers/videos");

const router = express.Router();

router.get("/seed", seedVideo);

router.get("/", getVideos);

router.put("/", addVideos);

router.patch("/:id", updateVideo);

module.exports = router;
