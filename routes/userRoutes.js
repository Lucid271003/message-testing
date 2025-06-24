const router = require('express').Router();
const controller = require('../controllers/userController');

router.post('/', controller.createUser);
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.get('/:id/inbox-messages', controller.getInboxMessages);
router.get('/:id/sent-messages', controller.getSentMessages);

module.exports = router;
