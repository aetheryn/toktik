const express = require("express");
const router = express.Router();

const {
  getAllUserProfile,
  getProfileById,
  addProfileData,
  removeProfileData,
} = require("../controllers/userProfile");

const { errorCheck } = require("../validators/errorCheck");
const { checkFollowInput } = require("../validators/userProfile");

router.get("/", getAllUserProfile);
router.post("/user/:username", getProfileById);
router.put("/:username", checkFollowInput, errorCheck, addProfileData);
router.put("/rm/:username", checkFollowInput, errorCheck, removeProfileData);

module.exports = router;
