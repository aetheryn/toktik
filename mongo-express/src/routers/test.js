const express = require("express");
const { tryData } = require("../controllers/userProfile");
const router = express.Router();

router.post("/:username", tryData);

module.exports = router;
