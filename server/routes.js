/**
 * Main application routes
 */
const errors = require('../components/errors');

// Import Endpoints

const user = require('../api/user');
const login = require('../api/login');
const category = require('../api/category');
const product = require('../api/products');
const uploads = require('../api/uploads');
const images = require('../api/images');


module.exports = (app) => {
  // Insert routes below
  app.use('/user', user);
  app.use('/login', login);
  app.use('/category', category);
  app.use('/product', product);
  app.use('/uploads', uploads);
  app.use('/images', images);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
};
