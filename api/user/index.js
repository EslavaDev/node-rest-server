const { Router } = require('express');
const controller = require('./user.controller');
const { verifyToken, verifyAdminRole } = require('../../server/middlewares/auth');

const router = new Router();

router.get('/', verifyToken, controller.getUsers);
router.post('/', [verifyToken, verifyAdminRole], controller.saveUser);
router.put('/:id', [verifyToken, verifyAdminRole], controller.updateUser);
router.delete('/:id', [verifyToken, verifyAdminRole], controller.deleteUser);

module.exports = router;
