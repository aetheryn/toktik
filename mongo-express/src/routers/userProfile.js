const express = require("express");
const router = express.Router();

const { getAllUserProfile } = require("../controllers/userProfile");

router.get("/", getAllUserProfile);

module.exports = router;
