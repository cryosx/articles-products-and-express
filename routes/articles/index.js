const express = require('express');
const router = express.Router();

const articlesDB = require('../../db/articles.js');
const checkFieldsExist = require('../../util/checkFieldsExist.js');

let deleteMessage = null;

router.use(checkFieldsExist(['title', 'body', 'author']));

router
  .route('/')
  .get((req, res) => {
    let articlesArr = articlesDB.getAll();
    return res.render(
      'articles/index',
      {
        endpoint: 'articles',
        error: deleteMessage,
        articles: articlesArr,
        render: articlesArr.length
      },
      (err, html) => {
        deleteMessage = null;
        res.send(html);
      }
    );
  })
  .post((req, res) => {
    const data = req.body;
    let failedPostValidation = validateArticlePost(data);
    console.log(failedPostValidation);
    if (failedPostValidation) {
      return res.render('articles/new', {
        error: failedPostValidation,
        article: data
      });
    }
    articlesDB.create(data);
    return res.redirect('/articles');
  });

router.route('/new').get((req, res) => {
  return res.render('articles/new');
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
      endpoint: 'articles',
      article: article
    });
  })
  .put((req, res) => {
    const data = req.body;
    let urlTitle = req.params.title;
    let failedPutValidation = validateArticlePut(data);
    if (failedPutValidation) {
      return res.render('articles/edit', {
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
    console.log('delete');
    let articleTitle = decodeURI(req.params.title);
    let urlTitle = req.params.title;
    let deletedArticle = articlesDB.delete(articleTitle)[0];

    if (!deletedArticle) {
      return (deleteMessage = `Could not delete ${deletedArticle.title}.`);
    }
    deleteMessage = `Deleted ${deletedArticle.title}`;
    return res.redirect(`/articles`);
  });

router.route('/:title/edit').get((req, res) => {
  let articleTitle = decodeURI(req.params.title);
  let urlTitle = req.params.title;
  return res.render('articles/edit', {
    endpoint: 'articles',
    urlTitle: urlTitle,
    article: articlesDB.get(articleTitle)
  });
});

function validateArticlePost(data) {
  let exists = articlesDB.get(data.title);
  if (exists) return 'Article exists';
  return false;
}

function validateArticlePut(data) {
  let exists = articlesDB.get(data.title);
  if (exists) return 'Another article already exists with that title';
  return false;
}

function validateArticleInput(data) {
  return false;
}

module.exports = router;
