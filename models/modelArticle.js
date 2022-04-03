const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  articleTitle: String,
  articleText: String,
  articleDate: Date,
  articleAuthor: String,
});

module.exports = mongoose.model('acsArticles', schema);
