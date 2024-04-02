const express = require("express");
const router = express.Router();

const {
  getAllUserProfile,
  getProfileById,
  addProfileData,
  removeProfileData,
} = require("../controllers/userProfile");

router.get("/", getAllUserProfile);
router.post("/user/:username", getProfileById);
router.put("/:username", addProfileData);
router.put("/rm/:username", removeProfileData);

module.exports = router;
