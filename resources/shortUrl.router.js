const genShortURL = require('./shortUrl.controller');
const { Router } = require('express');

router = Router();

router.post('/new', genShortURL);

module.exports = router;
