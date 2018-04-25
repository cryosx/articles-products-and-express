const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const articlesRoutes = require('./routes/articles.js');
const productsRoutes = require('./routes/products.js');

const PORT = process.env.PORT || 3000;

server.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
server.set('view engine', '.hbs');

server.use(express.static('public'));

server.use('/articles', articlesRoutes);
server.use('/products', productsRoutes);

server.get('*', (req, res) => {
  console.log(`Catchall GET`);
  res.end();
});
server.listen(PORT, err => {
  console.log(`Server listening on port: ${PORT}`);
});
