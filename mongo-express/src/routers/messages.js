const express = require("express");
const { getUserMessages, seedMessages } = require("../controllers/messages");
const router = express.Router();

router.get("/seed", seedMessages);
router.post("/:user", getUserMessages);

module.exports = router;
