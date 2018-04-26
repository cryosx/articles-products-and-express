const express = require('express');
const router = express.Router();
// const path = require('path');

// const productsDbPath = path.join(__, 'db/products.js');

const productsDB = require('../../db/products.js');
let deleteError = null;
router
  .route('/')
  .get((req, res) => {
    let productsArr = productsDB.getAll();
    return res.render(
      'index',
      {
        endpoint: 'products',
        error: deleteError,
        products: productsArr,
        render: productsArr.length
      },
      (err, html) => {
        deleteError = null;
        res.send(html);
      }
    );
  })
  .post((req, res) => {
    const data = req.body;
    let failedPostValidation = validatePost(data);
    if (failedPostValidation) {
      return res.render('new', { error: failedPostValidation, product: data });
    }
    productsDB.create(data);
    return res.redirect('/products');
  });

router.route('/new').get((req, res) => {
  return res.render('new');
});

router
  .route('/:id')
  .get((req, res) => {
    let prodID = Number.parseInt(req.params.id);
    res.render('product', {
      endpoint: 'products',
      product: productsDB.get(prodID)
    });
  })
  .put((req, res) => {
    const data = req.body;

    let prodID = Number.parseInt(req.params.id);
    data.id = prodID;
    let failedPutValidation = validatePut(data);
    if (failedPutValidation) {
      return res.render('edit', {
        endpoint: 'products',
        error: failedPutValidation,
        product: data
      });
    }
    productsDB.update(prodID, data);
    return res.redirect(`/products/${prodID}`);
  })
  .delete((req, res) => {
    let prodID = Number.parseInt(req.params.id);
    let deleteFailed = productsDB.delete(prodID).length;

    if (deleteFailed) {
      deleteError = 'Could  not delete product.';
    }
    return res.redirect(`/products`);
  });

router.route('/:id/edit').get((req, res) => {
  let prodID = Number.parseInt(req.params.id);
  return res.render('edit', {
    endpoint: 'products',
    product: productsDB.get(prodID)
  });
});

function validatePut(data) {
  if (!data) return 'No body.';
  if (!data.name) return 'No name.';
  if (!data.price) return 'No price.';
  if (!data.inventory) return 'No inventory.';
  if (Number.isNaN(new Number(data.price).valueOf()))
    return 'Price is not a number.';
  if (Number.isNaN(new Number(data.inventory).valueOf()))
    return 'Iventory is not a number';
  // if (!productsDB.getByName(data.name))
  //   return `Product with name '${data.name}' doesnt exist.`;
  return false;
}

function validatePost(data) {
  if (!data) return 'No body.';
  if (!data.name) return 'No name.';
  if (!data.price) return 'No price.';
  if (!data.inventory) return 'No inventory.';
  if (Number.isNaN(new Number(data.price).valueOf()))
    return 'Price is not a number.';
  if (Number.isNaN(new Number(data.inventory).valueOf()))
    return 'Iventory is not a number';
  // if (productsDB.getByName(data.name))
  //   return `Product with name '${data.name}' already exists.`;
  return false;
}

module.exports = router;
