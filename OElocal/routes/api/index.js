var express = require('express');
var router = express.Router();

//  /api/posting
router.use('/posting', require("./posting"));

module.exports = router;