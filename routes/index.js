var express = require('express');
var router = express.Router();

var property = require('./property.js');

/*
 * Routes that can be accessed by any one
 */
router.get('/', property.getAll);
router.get('/api/v1/output', property.getOne);

module.exports = router;
