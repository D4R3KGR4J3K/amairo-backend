const express = require('express');
const app = express();
const port = 3010;
const mongoose = require('mongoose');
require('dotenv').config();
const modelArticles = require('./models/modelArticle.js');
const modelService = require('./models/modelService.js');
const modelOpinion = require('./models/modelOpinion.js');

mongoose.connect(
  `mongodb+srv://darek:${process.env.PASSWORD}@dgvbotdb.r09om.mongodb.net/acsDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('Hello There!');
});

app.get('/article/', (req, res) => {
  if (req.query.search !== undefined) {
    if (req.query.search === '') {
      modelArticles
        .find({}, { _id: 0, __v: 0 })
        .limit(10)
        .then((query) => res.send(query));
      return;
    }

    modelArticles
      .find({ articleTitle: req.query.search }, { _id: 0, __v: 0 })
      .limit(10)
      .then((query) => res.send(query));
    return;
  }

  modelArticles.findOne((err, query) => {
    if (err) console.log(err);
    if (!query) {
      const newDate = new Date();

      const newArticle = new modelArticles({
        articleTitle: 'Nowa Strona Internetowa!',
        articleText:
          'Witaj na nowo utworzonej stronie internetowej! \nTutaj będą pojawiać się krótkie artykuły związne z naszą firmą.',
        articleDate: newDate,
        articleAuthor: 'System',
      });

      newArticle.save().catch((err) => console.log(err));

      res.send({
        articleTitle: 'Nowa Strona Internetowa!',
        articleText:
          'Witaj na nowo utworzonej stronie internetowej! \nTutaj będą pojawiać się krótkie artykuły związne z naszą firmą.',
        articleDate: newDate,
        articleAuthor: 'System',
      });

      return;
    }

    res.send([
      {
        title: query.articleTitle,
        text: query.articleText,
        date: query.articleDate,
        author: query.articleAuthor,
      },
    ]);
  });
});

app.get('/services/', (req, res) => {
  if (req.query.search === undefined || req.query.search === null) {
    modelService
      .find()
      .limit(3)
      .then((items) => {
        const list = [];
        items.forEach((item) => {
          list.push(item);
        });
        res.send({
          totalPages: modelService.find().count(),
        });
        return;
      })
      .catch((err) => res.send({ message: err }));
  }
});

app.get('/opinions/', (req, res) => {
  modelOpinion
    .find()
    .then((items) => {
      res.send(items);
      return;
    })
    .catch((err) => res.send({ message: err }));
});

app.listen(port, () => {
  console.log(`Server run on port: ${port}`);
});
