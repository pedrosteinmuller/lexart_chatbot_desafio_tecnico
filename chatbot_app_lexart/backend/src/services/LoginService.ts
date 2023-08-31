import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

class LoginService {

  constructor(private prisma = new PrismaClient()) {}

  private async comparePassword(inputPassword: string, hashBD: string) {
    try {
      const result = await compare(inputPassword, hashBD);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await this.comparePassword(password, user.password);

    if (isPasswordCorrect) {
      return user;
    }

    return null;
  }
}

export default LoginService;
