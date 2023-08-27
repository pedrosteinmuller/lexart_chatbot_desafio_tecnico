import { Request, Response } from 'express';
import UserService from '../services/UserService';
import HttpStatus from '../enum/HttpStatus';
import ErrorHandleMessages from '../enum/ErrorHandleMessages';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      await this.userService.registerUser(username, password);
      return res.status(HttpStatus.CREATED).json({ message: 'User registered successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
      }
      return res.status(HttpStatus.INTERNAL_ERROR).json({ message: ErrorHandleMessages.INTERNAL_ERROR });
    }
  }

}

export default UserController;
