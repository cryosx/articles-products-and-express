const express = require('express');

const articlesDB = require('../../db/articles.js');
const checkFieldsExist = require('../../util/checkFieldsExist.js');

const router = express.Router();

let deleteMessage = null;

router.use(checkFieldsExist(['title', 'body', 'author']));

router
  .route('/')
  .get((req, res) => {
    let articlesArr = articlesDB.getAll();
    res.render('articles/index', {
      back: '',
      endpoint: 'articles',
      error: deleteMessage,
      articles: articlesArr,
      render: articlesArr.length
    });
    return (deleteMessage = null);
  })
  .post((req, res) => {
    const data = req.body;
    let failedPostValidation = validateArticlePost(data);
    console.log(failedPostValidation);
    if (failedPostValidation) {
      return res.render('articles/new', {
        back: 'articles',
        error: failedPostValidation,
        article: data
      });
    }
    articlesDB.create(data);
    return res.redirect('/articles');
  });

router.route('/new').get((req, res) => {
  return res.render('articles/new', { back: 'articles' });
});

router
  .route('/:title')
  .get((req, res) => {
    let articleTitle = decodeURI(req.params.title);
    let article = articlesDB.get(articleTitle);

    if (!article) {
      return res.render('404');
    }

    return res.render('articles/article', {
      back: 'articles',
      endpoint: 'articles',
      article: article
    });
  })
  .put((req, res) => {
    const data = req.body;
    let urlTitle = req.params.title;

    let failedPutValidation = validateArticlePut(data, urlTitle);
    if (failedPutValidation) {
      return res.render('articles/edit', {
        back: urlTitle,
        endpoint: 'articles',
        error: failedPutValidation,
        urlTitle: urlTitle,
        article: data
      });
    }
    let article = articlesDB.update(decodeURI(urlTitle), data);
    return res.redirect(`/articles/${article.urlTitle}`);
  })
  .delete((req, res) => {
    let articleTitle = decodeURI(req.params.title);
    let urlTitle = req.params.title;
    let deletedArticle = articlesDB.delete(articleTitle)[0];

    if (!deletedArticle) {
      deleteMessage = `Could not delete ${deletedArticle.title}.`;
      return res.status(404).send();
    }
    deleteMessage = `Deleted ${deletedArticle.title}`;
    return res.redirect(`/articles`);
  });

router.route('/:title/edit').get((req, res) => {
  let articleTitle = decodeURI(req.params.title);
  let urlTitle = req.params.title;
  let article = articlesDB.get(articleTitle);
  return res.render('articles/edit', {
    back: urlTitle,
    endpoint: 'articles',
    urlTitle: urlTitle,
    article: article
  });
});

function validateArticlePost(data) {
  let exists = articlesDB.get(data.title);
  if (exists) return 'Article exists';
  if (data.title.trim() === '') return 'Title cannot be an empty string';
  if (data.author.trim() === '') return 'Author cannot be an empty string';
  if (data.body.trim() === '') return 'Body cannot be an empty string';
  return false;
}

function validateArticlePut(data, urlTitle) {
  if (data.title === decodeURI(urlTitle)) return false;
  if (data.title.trim() === '') return 'Title cannot be an empty string';
  if (data.author.trim() === '') return 'Author cannot be an empty string';
  if (data.body.trim() === '') return 'Body cannot be an empty string';

  let exists = articlesDB.get(data.title);
  if (exists) return 'Another article already exists with that title';
  return false;
}

// function validateArticlePost(data) {
//   if (data.title.trim() === '') return 'Title cannot be an empty string';
//   if (data.author.trim() === '') return 'Author cannot be an empty string';
//   if (data.body.trim() === '') return 'Body cannot be an empty string';

//   return false;
// }

module.exports = router;
