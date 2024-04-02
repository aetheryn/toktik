const express = require("express");
const router = express.Router();

const {
  getAllUserProfile,
  getProfileById,
} = require("../controllers/userProfile");

router.get("/", getAllUserProfile);
router.post("/user/:username", getProfileById);

module.exports = router;
