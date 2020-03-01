const mongoose = require('mongoose');

const shortUrl = new mongoose.Schema({
	original_url: {
		type: String,
		required: true,
	},
	short_url: {
		type: Number,
		required: true,
	},
});

const ShortUrl = mongoose.model('shortUrl', shortUrl);

module.exports = ShortUrl;
