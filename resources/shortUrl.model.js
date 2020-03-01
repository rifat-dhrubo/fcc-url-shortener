import mongoose from 'mongoose';

const shortUrl = new mongoose.Schema();

export const ShortUrl = mongoose.model('user', shortUrl);
