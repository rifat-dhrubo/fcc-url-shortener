const mongoose = require('mongoose');

const connect = (url, opts = {}) => {
	return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

module.exports = connect;
