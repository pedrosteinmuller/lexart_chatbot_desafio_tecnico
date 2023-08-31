import { Router } from 'express';
import ConversationController from '../controllers/ConversationController';

const router = Router();

const conversationController = new ConversationController();
router.post('/', conversationController.getConversation);

router.get('/exportCSV/:historyId', conversationController.exportCSV);

router.get('/chatHistory/:userId', conversationController.getChatHistoryByUserId);

export default router;
