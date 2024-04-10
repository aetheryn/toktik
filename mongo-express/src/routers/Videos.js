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
  addLikes,
  removeLikes,
} = require("../controllers/videos");
const {
  validateIdInParam,
  validateAddVideoData,
  validateUpdateVideoData,
  validateIdInBody,
} = require("../validators/videos");
const { errorCheck } = require("../validators/errorCheck");
const { uploadSingleFile } = require("../middleware/videos");
const { authUser, authContentModerator } = require("../middleware/auth");

const router = express.Router();

router.get("/seed", authContentModerator, seedVideo);

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

router.post("/videoupload", authUser, uploadSingleFile, uploadFile);

router.post("/:username", authUser, getVideoByUser);

router.get("/flagged", authContentModerator, getFlaggedVideos);

router.patch("/flagged/:id", authUser, updateFlaggedVideo);

router.put("/comments/:id", authUser, addComments);

router.put("/getvideo", getSelectVideo);

router.put("/likes/:id", authUser, addLikes);

router.put("/likes/remove/:id", authUser, removeLikes);

module.exports = router;
