var express = require('express');
var router = express.Router();
var controller = require('../controllers/customers');

router.get('/', controller.index);
router.get('/new', controller.create);
router.post('/new', controller.insert);
router.get('/:id', controller.view);
router.get('/:id/edit', controller.edit);
router.post('/:id/edit', controller.update);
router.get('/:id/remove', controller.remove);

module.exports = router;
