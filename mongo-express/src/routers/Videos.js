const express = require("express");

const {
  seedVideo,
  getVideos,
  addVideos,
  updateVideo,
  deleteVideo,
  getSpecificVideo,
  uploadFile,
  getVideoByUser,
  getFlaggedVideos,
  updateFlaggedVideo,
  addComments,
  getSelectVideo,
} = require("../controllers/videos");
const {
  validateIdInParam,
  validateAddVideoData,
  validateUpdateVideoData,
  validateIdInBody,
} = require("../validators/videos");
const { errorCheck } = require("../validators/errorCheck");
const { uploadSingleFile } = require("../middleware/videos");

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

router.post("/videoupload", uploadSingleFile, uploadFile);

router.post("/:username", getVideoByUser);

router.get("/flagged", getFlaggedVideos);

router.patch("/flagged/:id", updateFlaggedVideo);

router.put("/comments/:id", addComments);

router.put("/getvideo", getSelectVideo);

module.exports = router;
