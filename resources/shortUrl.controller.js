const dns = require('dns');
const ShortUrl = require('./shortUrl.model');

const genShortURL = async (req, res) => {
	const { urlToShort } = req.body;
	let test = false;
	const url = String(urlToShort.slice(12)); // only domain e.g google.com
	try {
		const address = await lookupPromise(url);
		if (address) test = true;
	} catch (err) {
		test = false;
		console.error(err);
	}

	if (test) {
		try {
			const found = await ShortUrl.find({ original_url: urlToShort }).exec();
			const short_url = Math.floor(Math.random() * 1000);

			if (found.length === 0) {
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
					short_url: found[0].short_url,
				});
			}
		} catch (error) {
			console.error(error);
		}
	} else {
		res.json({
			error: 'invalid URL',
		});
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

module.exports = genShortURL;
