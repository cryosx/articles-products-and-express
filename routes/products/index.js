const express = require('express');
const router = express.Router();

const productsDB = require('../../db/products.js');
const checkFieldsExist = require('../../util/checkFieldsExist.js');
const checkFieldsDataType = require('../../util/checkFieldsDataType.js');

let deleteMessage = null;

router.use(checkFieldsExist(['name', 'price', 'inventory']));
// router.use(
//
//   checkFieldsDataType('products', {
//     name: 'string',
//     price: 'number',
//     inventory: 'number'
//   })
// );

router
  .route('/')
  .get((req, res) => {
    let productsArr = productsDB.getAll();
    return res.render(
      'products/index',
      {
        endpoint: 'products',
        error: deleteMessage,
        products: productsArr,
        render: productsArr.length
      },
      (err, html) => {
        deleteMessage = null;
        res.send(html);
      }
    );
  })
  .post((req, res) => {
    const data = req.body;
    let failedPostValidation = validateProductInput(data);
    if (failedPostValidation) {
      return res.render('products/new', {
        error: failedPostValidation,
        product: data
      });
    }
    productsDB.create(data);
    return res.redirect('/products');
  });

router.route('/new').get((req, res) => {
  return res.render('products/new');
});

router
  .route('/:id')
  .get((req, res) => {
    let prodID = Number.parseInt(req.params.id);
    let prodExists = productsDB.get(prodID);

    if (!prodExists) {
      return res.render('404');
    }

    return res.render('products/product', {
      endpoint: 'products',
      product: productsDB.get(prodID)
    });
  })
  .put((req, res) => {
    const data = req.body;

    let prodID = Number.parseInt(req.params.id);
    // data.id = prodID;

    let failedPutValidation = validateProductInput(data);
    if (failedPutValidation) {
      return res.render('products/edit', {
        endpoint: 'products',
        error: failedPutValidation,
        id: prodID,
        product: data
      });
    }
    productsDB.update(prodID, data);
    return res.redirect(`/products/${prodID}`);
  })
  .delete((req, res) => {
    let prodID = Number.parseInt(req.params.id);
    let deletedProd = productsDB.delete(prodID)[0];

    if (!deletedProd) {
      return (deleteMessage = `Could not delete ${deletedProd.name}.`);
    }
    deleteMessage = `Deleted ${deletedProd.name}`;
    return res.redirect(`/products`);
  });

router.route('/:id/edit').get((req, res) => {
  let prodID = Number.parseInt(req.params.id);
  return res.render('edit', {
    endpoint: 'products',
    id: prodID,
    product: productsDB.get(prodID)
  });
});

function validateProductInput(data) {
  console.log(Number.isNaN(new Number(data.inventory)));
  if (data.price.trim() === '') return 'Price is not a number.';
  if (Number.isNaN(new Number(data.price).valueOf()))
    return 'Price is not a number.';
  if (data.inventory.trim() === '') return 'Inventory is not a number.';
  if (Number.isNaN(new Number(data.inventory).valueOf()))
    return 'Inventory is not a number.';
  return false;
}

function validatePut(data) {
  if (!data) return 'No body.';
  if (!data.name) return 'No name.';
  if (!data.price) return 'No price.';
  if (!data.inventory) return 'No inventory.';
  if (Number.isNaN(new Number(data.price).valueOf()))
    return 'Price is not a number.';
  if (Number.isNaN(Number.parseFloat(data.price)))
    return 'Price is not a number.';
  if (Number.isNaN(new Number(data.inventory).valueOf()))
    return 'Iventory is not a number';
  if (Number.isNaN(Number.parseInt(data.inventory)))
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
  if (Number.isNaN(Number.parseFloat(data.price)))
    return 'Price is not a number.';
  if (Number.isNaN(new Number(data.inventory).valueOf()))
    return 'Iventory is not a number';
  if (Number.isNaN(Number.parseInt(data.inventory)))
    return 'Iventory is not a number';
  // if (productsDB.getByName(data.name))
  //   return `Product with name '${data.name}' already exists.`;
  return false;
}

module.exports = router;
