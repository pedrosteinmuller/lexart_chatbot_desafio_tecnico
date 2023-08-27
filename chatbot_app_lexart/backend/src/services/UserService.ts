import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import ErrorHandleMessages from '../enum/ErrorHandleMessages';

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async registerUser(username: string, password: string): Promise<void> {
    // Verificar se o usuário já existe
    const existingUser = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      throw new Error(ErrorHandleMessages.USER_ALREADY_EXISTS);
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Criar o usuário
    await this.prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
  }
}

export default UserService;
