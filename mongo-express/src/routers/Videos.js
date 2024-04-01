const express = require("express");
const { seedVideo } = require("../controllers/videos");

const router = express.Router();

router.get("/", seedVideo);

module.exports = router;
