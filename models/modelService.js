const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  serviceTitle: String,
  serviceIMG: String,
  servicePrice: Number,
  serviceDescription: String,
  serviceTime: Number,
});

module.exports = mongoose.model('acsServices', schema);
