const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const routes = require('./routes');
// const articlesRoutes = require('./routes/articles.js');
// const productsRoutes = require('./routes/products.js');

const PORT = process.env.PORT || 3000;

server.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
server.set('view engine', '.hbs');

server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static('public'));

server.use('/', routes);
// server.use('/articles', articlesRoutes);
// server.use('/products', productsRoutes);

server.get('*', (req, res) => {
  console.log(`Catchall GET`);
  res.json({ success: false });
});
server.listen(PORT, err => {
  console.log(`Server listening on port: ${PORT}`);
});
