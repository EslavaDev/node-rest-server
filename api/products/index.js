const { Router } = require('express');
const controller = require('./product.controller');
const { verifyToken } = require('../../server/middlewares/auth');

const router = new Router();
/*
*/
router.post('/', [verifyToken], controller.saveProduct);
router.put('/:id', [verifyToken], controller.updateProduct);
router.get('/:id', verifyToken, controller.getId);
router.get('/search/:term', verifyToken, controller.getProductSearch);
router.get('/', verifyToken, controller.getAll);
router.delete('/:id', [verifyToken], controller.removeProduct);

module.exports = router;
