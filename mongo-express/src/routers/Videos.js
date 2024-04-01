const express = require("express");
const {
  seedVideo,
  getVideos,
  addVideos,
  updateVideo,
  deleteVideo,
  getSpecificVideo,
} = require("../controllers/videos");

const router = express.Router();

router.get("/seed", seedVideo);

router.get("/", getVideos);

router.put("/", addVideos);

router.patch("/:id", updateVideo);

router.delete("/:id", deleteVideo);

router.post("/", getSpecificVideo);

module.exports = router;
