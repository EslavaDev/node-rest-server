const { Router } = require('express');
const controller = require('./uploads.controller');
const { verifyToken } = require('../../server/middlewares/auth');

const router = new Router();

router.put('/:tipo/:id', [verifyToken], controller.updates);


module.exports = router;
