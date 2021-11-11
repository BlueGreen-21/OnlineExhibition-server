const express = require("express");
const router = express.Router();

// /api/posting
router.use("/posting", require("./posting"));

module.exports = router;
