import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import HttpStatus from '../enum/HttpStatus';
import ErrorHandleMessages from '../enum/ErrorHandleMessages';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await this.loginService.login(username, password);
      if (user) {
        return res.status(HttpStatus.OK).json({ message: 'Login successfully!!', user });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: ErrorHandleMessages.INVALID_USERNAME_OR_PASSWORD });
      }
    } catch (error) {
      return res.status(500).json({ message: ErrorHandleMessages.INTERNAL_ERROR });
    }
  }
}

export default LoginController;
