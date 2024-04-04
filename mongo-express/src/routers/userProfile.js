const express = require("express");
const router = express.Router();

const {
  getAllUserProfile,
  getProfileById,
  addProfileData,
  removeProfileData,
  updateDescription,
} = require("../controllers/userProfile");

const { errorCheck } = require("../validators/errorCheck");
const { checkFollowInput } = require("../validators/userProfile");

router.get("/", getAllUserProfile);
router.post("/user/:username", getProfileById);
router.put("/:username", errorCheck, addProfileData);
router.put("/description/:username", errorCheck, updateDescription);
router.put("/rm/:username", errorCheck, removeProfileData);

module.exports = router;
