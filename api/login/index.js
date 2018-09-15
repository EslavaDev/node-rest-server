const { Router } = require('express');
const controller = require('./login.controller');

const router = new Router();

// router.get('/', controller.getUsers);
router.post('/', controller.login);

module.exports = router;
