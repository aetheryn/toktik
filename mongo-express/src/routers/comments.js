const express = require("express");
const router = express.Router();

const { findComments } = require("../controllers/videos.js");

router.post("/replies/:id", findComments);

module.exports = router;
