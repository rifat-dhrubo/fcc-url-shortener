const { genShortURL, redirectFoundUrl } = require('./shortUrl.controller');
const { Router } = require('express');

router = Router();

router.post('/new', genShortURL);

router.get('/new/:short_url', redirectFoundUrl);

module.exports = router;
