const { createMessage, getMessage } = require('../controller/MessagesController');
const router = require('express').Router();

router.post('/', createMessage);
router.get('/:conversationId', getMessage);

module.exports = router;