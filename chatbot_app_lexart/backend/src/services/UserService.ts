import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

class UserService {
  async registerUser(username: string, password: string): Promise<void> {
    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Criar o usuário
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });
  }
}

export default UserService;
