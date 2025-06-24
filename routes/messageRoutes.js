const router = require('express').Router();
const controller = require('../controllers/messageController');

router.post('/', controller.sendMessage);
router.get('/:id', controller.getMessageById);

module.exports = router;
