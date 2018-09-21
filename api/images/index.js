const { Router } = require('express');
const controller = require('./images.controller');
const { verifyTokenQuery } = require('../../server/middlewares/auth');

const router = new Router();

router.get('/:tipo/:img', verifyTokenQuery, controller.image);


module.exports = router;
