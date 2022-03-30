const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  articleTitle: String,
  articleText: String,
  articleDate: Date,
  articleAuthor: String,
});

export default mongoose.model('acsArticles', schema);
