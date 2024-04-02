const express = require("express");
const router = express.Router();

const {
  getAllUserProfile,
  getProfileById,
  addProfileData,
} = require("../controllers/userProfile");

router.get("/", getAllUserProfile);
router.post("/user/:username", getProfileById);
router.put("/:username", addProfileData);

module.exports = router;
