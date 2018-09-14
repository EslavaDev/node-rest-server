/**
 * Main application routes
 */
const errors = require('../components/errors');

// Import Endpoints

const user = require('../api/user');


module.exports = (app) => {
  // Insert routes below
  console.log('test');
  app.use('/user', user);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);
};
