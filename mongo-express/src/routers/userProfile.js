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
const { authUser } = require("../middleware/auth");

router.get("/", getAllUserProfile);
router.post("/user/:username", authUser, getProfileById);
router.put("/:username", authUser, errorCheck, addProfileData);
router.put("/description/:username", authUser, errorCheck, updateDescription);
router.put("/rm/:username", authUser, errorCheck, removeProfileData);

module.exports = router;
