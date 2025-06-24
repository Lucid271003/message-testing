const router = require('express').Router();
const controller = require('../controllers/recipientController');

router.patch('/:id/mark-read', controller.markAsRead);

module.exports = router;
