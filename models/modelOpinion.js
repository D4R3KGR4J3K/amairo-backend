const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  opinionAuthor: String,
  opinionText: String,
  opinionStars: Number,
});

module.exports = mongoose.model('acsOpinions', schema);
