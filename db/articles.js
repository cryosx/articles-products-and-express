module.exports = (function() {
  let articles = [
    {
      title: 'The Oracle Year: A Novel',
      body:
        'Knowledge is power. So when an unassuming Manhattan bassist named Will Dando awakens from a dream one morning with 108 predictions about the future in his head, he rapidly finds himself the most powerful man in the world. Protecting his anonymity by calling himself the Oracle, he sets up a heavily guarded Web site with the help of his friend Hamza to selectively announce his revelations. In no time, global corporations are offering him millions for exclusive access, eager to profit from his prophecies.',
      author: 'Charles Soule',
      urlTitle: encodeURI('The Oracle Year: A Novel')
    },
    {
      title: 'Circe',
      body:
        'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child--not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power--the power of witchcraft, which can transform rivals into monsters and menace the gods themselves.',
      author: 'Madeline Miller',
      urlTitle: encodeURI('Circe')
    },
    {
      title: 'A Higher Loyalty: Truth, Lies, and Leadership',
      body: `Mr. Comey served as director of the FBI from 2013 to 2017, appointed to the post by President Barack Obama. He previously served as U.S. attorney for the Southern District of New York, and the U.S. deputy attorney general in the administration of President George W. Bush. From prosecuting the Mafia and Martha Stewart to helping change the Bush administration's policies on torture and electronic surveillance, overseeing the Hillary Clinton e-mail investigation as well as ties between the Trump campaign and Russia, Comey has been involved in some of the most consequential cases and policies of recent history.`,
      author: 'James Comey',
      urlTitle: encodeURI('A Higher Loyalty: Truth, Lies, and Leadership')
    }
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
    console.log(article);
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
    console.log(data);
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
