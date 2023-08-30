import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
import ErrorHandleMessages from '../enum/ErrorHandleMessages';

interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
}

export default class UserService {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async registerUser(username: string, password: string): Promise<IUser> {
    try {
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

      const newUser = await this.prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
          createdAt: new Date(),
        },
      });

      return newUser;
    } finally {
      await this.prisma.$disconnect();
    }
  }
}
