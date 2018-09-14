const { Router } = require('express');
const controller = require('./user.controller');

const router = new Router();

router.get('/', controller.getUsers);
router.post('/', controller.saveUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
