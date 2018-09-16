const { Router } = require('express');
const controller = require('./login.controller');

const router = new Router();

router.post('/google', controller.google);
router.post('/', controller.login);
module.exports = router;
