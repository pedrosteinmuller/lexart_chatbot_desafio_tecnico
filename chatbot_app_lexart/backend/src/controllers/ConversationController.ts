import { Request, Response } from 'express';
import ConversationService from '../services/ConversationService';
import fs from "fs";

export default class ConversationController {

  constructor(private conversationService = new ConversationService()) {}

  async exportCSV(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      const chatHistory = await this.conversationService.getChatHistoryById(Number(userId));
      
      if (chatHistory.length === 0) {
        return res.status(404).json({ message: 'Chat History Not Found!' });
      }

      const csvData = chatHistory.map(conversation => {
        const content = conversation.content;
        return `${content}`;
      }).join('\n');

      const filePath = `chat_history_user_${userId}.csv`;
      fs.writeFileSync(filePath, csvData, 'utf-8');

      res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);
      res.setHeader('Content-Type', 'text/csv');
      res.status(200).send(csvData);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getChatHistoryByUserId(req: Request, res: Response): Promise<Response> {
    const userId = req.params.userId;

    try {
      const chatHistory = await this.conversationService.getChatHistoryById(Number(userId));
      return res.status(200).json(chatHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getConversation(req: Request, res: Response): Promise<Response> {
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: 'User ID and content are required.' });
    }

    try {
      const conversation = await this.conversationService.createConversation(userId, content);
      return res.status(201).json({ message: 'Conversation created successfully.', conversation });
    } catch (error) {
      console.error('Error trying to save your conversation:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
