import { Request } from 'express'
import { LoginService } from './login.service'

export class LoginController {
  private loginService = new LoginService()

  async login(req: Request) {
    return await this.loginService.login(req.body)
  }
}
