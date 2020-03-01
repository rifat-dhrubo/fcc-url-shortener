const mongoose = require('mongoose');

const connect = (url, opts = {}) => {
	return mongoose.connect(url, { ...opts, useNewUrlParser: true });
};

const asyncHandle = (promise) => {
	return promise.then((data) => [null, data]).catch((err) => [err]);
};
module.exports = { connect, asyncHandle };
