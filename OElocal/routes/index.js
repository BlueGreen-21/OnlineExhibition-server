var express = require('express');
var router = express.Router();

//  /api
router.use('/api', require("./api"));

module.exports = router;
