const express = require('express');
const router = express.Router();
// const path = require('path');

// const productsDbPath = path.join(__, 'db/products.js');

const productsDB = require('../../db/products.js');

router
  .route('/')
  .get((req, res) => {
    let productsArr = productsDB.getAll();
    res.render('index', {
      endpoint: 'products',
      products: productsArr,
      render: productsArr.length
    });
  })
  .post((req, res) => {
    const data = req.body;
    // if (!validate(data)) {
    //   res.render('new');
    // }
    productsDB.create(data);
    res.redirect('/products');
  });

router.route('/new').get((req, res) => {
  res.render('new');
});

router
  .route('/:id')
  .get((req, res) => {
    let prodID = Number.parseInt(req.params.id);
    res.render('product', {
      product: productsDB.get(prodID)
    });
  })
  .put((req, res) => {
    console.log('PUT');
    const data = req.body;
    let prodID = Number.parseInt(req.params.id);

    // if (!validate(data)) {
    //   res.render('new');
    // }
    productsDB.update(prodID, data);
    res.redirect(`/products/${prodID}`);
  })
  .delete((req, res) => {});

router.route('/:id/edit').get((req, res) => {
  let prodID = Number.parseInt(req.params.id);
  res.render('edit', {
    endpoint: 'products',
    product: productsDB.get(prodID)
  });
});

module.exports = router;
