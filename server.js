const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { connect: dbConnect } = require('./utils/database');
const xo = require('./resources/shortUrl.router');

app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use('/api/shorturl', xo);

app.use((req, res) => {
	return res.status(404).send({ message: 'Route' + req.url + ' Not found.' });
});

const start = async () => {
	try {
		await dbConnect(process.env.DB_URI, { useUnifiedTopology: true });
		app.listen(process.env.PORT || 3000, () => {
			console.log(`App is on http://localhost:${process.env.PORT || 3000}`);
		});
	} catch (e) {
		console.error(e);
	}
};

module.exports = start;
