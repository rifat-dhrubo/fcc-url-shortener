const { headerInfo } = require('./shortUrl.controller');
const { Router } = require('express');

router = Router();

router.get('/', headerInfo);

module.exports = router;
