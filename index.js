const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const mongoose = require('mongoose');
const modelArticles = require('./models/modelArticles.js');

mongoose.connect(
  'mongodb+srv://darek:<password>@dgvbotdb.r09om.mongodb.net/acsDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.static('static'));

app.get('/', (req, res) => {
  modelArticles;
});

app.get('/', (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
