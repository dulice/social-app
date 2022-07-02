const { createConversation, getUserConversation, getTwoUsersConversation } = require('../controller/ConversationController');
const router = require('express').Router();

router.post('/', createConversation);
router.get('/:userId', getUserConversation);
router.get('/find/:sender/:reciever', getTwoUsersConversation);

module.exports = router;