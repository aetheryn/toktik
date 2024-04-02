const express = require("express");

const {
  seedVideo,
  getVideos,
  addVideos,
  updateVideo,
  deleteVideo,
  getSpecificVideo,
  uploadVideo,
} = require("../controllers/videos");
const {
  validateIdInParam,
  validateAddVideoData,
  validateUpdateVideoData,
  validateIdInBody,
} = require("../validators/videos");
const { errorCheck } = require("../validators/errorCheck");
const { uploadSingleVideo } = require("../middleware/videos");

const router = express.Router();

router.get("/seed", seedVideo);

router.get("/", getVideos);

router.put("/", validateAddVideoData, errorCheck, addVideos);

router.patch(
  "/:id",
  validateIdInParam,
  validateUpdateVideoData,
  errorCheck,
  updateVideo
);

router.delete("/:id", validateIdInParam, errorCheck, deleteVideo);

router.post("/", validateIdInBody, errorCheck, getSpecificVideo);

router.post("/videos/videoupload", uploadSingleVideo, uploadVideo);

module.exports = router;
