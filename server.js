const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const analytics = require('./util/analytics.js');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const server = express();

// HANDLEBARS
server.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
server.set('view engine', '.hbs');

// STATIC FOLDER
server.use(express.static('public'));

// BODY PARSING
server.use(bodyParser.urlencoded({ extended: true }));

// METHOD OVERRIDE
server.use(methodOverride('_method'));

// ANALYTICS
server.use(analytics);

// ROUTING
server.use('/', routes);

server.get('*', (req, res) => {
  console.log(`Catchall GET`);
  res.status(404).render('404');
});

server.listen(PORT, err => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
