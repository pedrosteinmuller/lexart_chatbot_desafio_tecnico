import { Request, Response } from 'express';
import UserService from '../services/UserService';
import dotenv from 'dotenv';

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    const { username, password } = req.body;
  
    try {
      await this.userService.registerUser(username, password);
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Ops! an error occurred' });
    }
  }
  
}

export default UserController;
