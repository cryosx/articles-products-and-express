const express = require('express');
const router = express.Router();

const articles = require('./articles');
const products = require('./products');

router.use('/articles', articles);
router.use('/products', products);

module.exports = router;
