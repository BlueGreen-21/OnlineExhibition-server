var express = require('express');
var router = express.Router();

//  /api/posting

//  /api/posting/read
router.get('/read', require("./postingReadGET"));

router.get('/read/:id', require("./postingReadIdGET"));

router.post('/create', require("./postingCreatePOST"));

router.put('/update/:id', require("./postingUpdateIdPUT"));

router.delete('/delete/:id', require("./postingDeleteIdDELETE"));

module.exports = router;