const dns = require('dns');
const ShortUrl = require('./shortUrl.model');
const { asyncHandle } = require('../utils/database');

const genShortURL = async (req, res) => {
	const { urlToShort } = req.body;
	let foundUrl = false;

	const url = String(urlToShort.slice(12)); // only domain e.g google.com
	const address = await lookupPromise(url);

	if (address) foundUrl = true;
	else {
		foundUrl = false;
		console.error(`errurl ${errUrl}`);
	}

	if (foundUrl) {
		const [errData, foundData] = await asyncHandle(
			ShortUrl.find({ original_url: urlToShort }).exec()
		);

		const short_url = Math.floor(Math.random() * 1000);

		if (errData === null) {
			if (foundData.length === 0) {
				ShortUrl.create({
					original_url: urlToShort,
					short_url: short_url,
				});
				res.json({
					original_url: urlToShort,
					short_url: short_url,
				});
			} else {
				res.json({
					original_url: urlToShort,
					short_url: foundData[0].short_url,
				});
			}
		} else {
			console.error(errData);
		}
	} else {
		res.json({
			error: 'invalid URL',
		});
	}
};

const redirectFoundUrl = async (req, res) => {
	const { short_url } = req.params;
	const [, foundData] = await asyncHandle(ShortUrl.findOne({ short_url: short_url }).exec());
	if (foundData === null) {
		res.json({
			error: 'Specified short url do not exist',
		});
	} else {
		res.redirect(301, foundData.original_url);
	}
};

async function lookupPromise(url) {
	return new Promise((resolve, reject) => {
		dns.lookup(url, (err, address, family) => {
			if (err) reject(err);
			resolve(address);
		});
	});
}

module.exports = { genShortURL, redirectFoundUrl };
