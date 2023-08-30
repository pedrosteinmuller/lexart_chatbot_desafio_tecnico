import { Request, Response } from 'express';
import UserService from '../services/UserService';
import HttpStatus from '../enum/HttpStatus';

export default class UserController {

  constructor(private userService = new UserService()) {}

  register = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      await this.userService.registerUser(username, password);
      return res.status(HttpStatus.CREATED).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(HttpStatus.INTERNAL_ERROR).json({ message: 'An error occurred while registering the user.' });
    }
  }
}

