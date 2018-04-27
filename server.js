const express = require('express');
const server = express();

const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const analytics = require('./util/analytics.js');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

// HANDLEBARS
server.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
server.set('view engine', '.hbs');

// BODY PARSING
server.use(bodyParser.urlencoded({ extended: true }));

// METHOD OVERRIDE
server.use(methodOverride('_method'));

// ANALYTICS
server.use(analytics);

// STATIC FOLDER
server.use(express.static('public'));

// ROUTING
server.use('/', routes);

server.get('*', (req, res) => {
  console.log(`Catchall GET`);
  res.json({ success: false });
});
server.listen(PORT, err => {
  console.log(`Server listening on port: ${PORT}`);
});
