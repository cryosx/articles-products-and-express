module.exports = (function() {
  let articles = [
    { title: 'title', body: 'body', author: 'author', urlTitle: 'title' }
  ];
  return {
    get: getArticle,
    getAll: getAllArticles,
    create: createArticle,
    update: updateArticle,
    delete: deleteArticle
  };
  function getArticle(title) {
    let article = articles.find(function(elem) {
      return elem.title === title;
    });
    return article;
  }
  function getAllArticles() {
    return articles;
  }
  function createArticle(data) {
    // let exists = getArticle(data.title);
    // if (!exists) {
    //   return false;
    // }
    let article = {
      title: data.title,
      author: data.author,
      body: data.body,
      urlTitle: encodeURI(data.title)
    };
    return articles.push(article);
  }

  function updateArticle(title, data) {
    let article = getArticle(title);

    for (const key in data) {
      if (article.hasOwnProperty(key)) {
        article[key] = data[key];
      }
    }
    article.urlTitle = encodeURI(article.title);
    return article;
  }

  function deleteArticle(title) {
    let articleIndex = articles.findIndex(function(article, index) {
      return article.title === title;
    });

    if (articleIndex === -1) {
      return false;
    }
    return articles.splice(articleIndex, 1);
    // return true;
  }
})();
