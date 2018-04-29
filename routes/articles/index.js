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
        back: '',
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
    console.log(data.title);
    console.log(urlTitle);

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
      return (deleteMessage = `Could not delete ${deletedArticle.title}.`);
    }
    deleteMessage = `Deleted ${deletedArticle.title}`;
    return res.redirect(`/articles`);
  });

router.route('/:title/edit').get((req, res) => {
  let articleTitle = decodeURI(req.params.title);
  let urlTitle = req.params.title;
  return res.render('articles/edit', {
    back: urlTitle,
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

function validateArticlePut(data, urlTitle) {
  if (data.title === decodeURI(urlTitle)) return false;
  if (data.title.trim() === '') return 'Title cannot be an empty string';
  if (data.author.trim() === '') return 'Author cannot be an empty string';
  if (data.body.trim() === '') return 'Body cannot be an empty string';

  let exists = articlesDB.get(data.title);
  if (exists) return 'Another article already exists with that title';
  return false;
}

function validateArticlePost(data) {
  if (data.title.trim() === '') return 'Title cannot be an empty string';
  if (data.author.trim() === '') return 'Author cannot be an empty string';
  if (data.body.trim() === '') return 'Body cannot be an empty string';

  return false;
}

module.exports = router;
