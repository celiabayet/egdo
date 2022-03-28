var express = require('express');
var router = express.Router();

var articleModel = require('../models/articles')

router.post('/add-article', async function (req, res, next) {
  var error = [];
  var result = "Il ne s'est rien passé";
  var saveArticle = null;

  const data = await articleModel.findOne({
    title: req.body.title
  })

  if (data != null) {
    error.push('Un article portant ce titre est déjà présent.')
  }

  if (req.body.title == ''
    || req.body.img == ''
    || req.body.content == ''
    || req.body.author == ''
    || req.body.category == ''
  ) {
    error.push('champs vides')
  }

  if (error.length == 0) {
    var newArticle = new articleModel({
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      img: req.body.img,
      author: req.body.author,
      category: req.body.category,
      isNews: false
    })

    saveArticle = await newArticle.save()

    if (saveArticle) {
      result = "Félicitations, l'article est ajouté !"
    }
  }

  res.json({ result, error })
})

router.get('/see-articles', async function (req, res, next) {
  const articles = await articleModel.find()
  res.json({ articles })
})

router.get('/send-article-to-store/:title', async function (req, res, next) {
  const article = await articleModel.findOne({ title: req.params.title })
  console.log(article)
  res.json({ article })
})

router.delete('/remove-article/:title', async function (req, res, next) {
  let result;
  await articleModel.deleteOne({ title: req.params.title });
  const article = await articleModel.findOne({ title: req.params.title });
  if (article != null) {
    result = "Il semble que la suppression n'ait pas fonctionné."
  } else {
    result = "Félicitations ! L'article a bien été supprimé."
  }
  res.json(result)
});

module.exports = router;