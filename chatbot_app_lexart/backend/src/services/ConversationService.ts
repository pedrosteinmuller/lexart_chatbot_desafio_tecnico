import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ConversationService {
  async createConversation(userId: number, content: string) {
    try {
      const conversation = await prisma.conversation.create({
        data: {
          userId,
          content,
        },
      });
      return conversation;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw new Error('Failed to create conversation.');
    }
  }

  async getChatHistoryById(userId: number) {
    try {
      const chatHistory = await prisma.conversation.findMany({
        where: {
          userId,
        },
      });
      return chatHistory;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw new Error('Failed to fetch chat history.');
    }
  }
}
