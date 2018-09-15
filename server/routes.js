/**
 * Main application routes
 */
const errors = require('../components/errors');

// Import Endpoints

const user = require('../api/user');
const login = require('../api/login');


module.exports = (app) => {
  // Insert routes below
  app.use('/user', user);
  app.use('/login', login);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
};
