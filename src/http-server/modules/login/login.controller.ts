import { Request, Router } from 'express'
import { route } from '../../utils/route'
import { loginMapper, loginService } from './login.module'

export class LoginController {
  constructor(router: Router) {
    router.post('/', route.bind(null, this.login))
  }
  async login(req: Request) {
    const loginDto = req.body
    const login = await loginService.login(loginMapper.dtoToEntity(loginDto))
    return loginMapper.entityToDto(login!.user, login!.token)
  }
}
