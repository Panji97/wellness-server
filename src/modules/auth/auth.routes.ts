import { Router } from 'express'
import AuthenticateController from './auth.controllers'

export default class AuthenticateRoutes {
  private router: Router
  private controller: AuthenticateController

  constructor() {
    this.router = Router()
    this.controller = new AuthenticateController()
  }

  routes(): Router {
    this.router.post('/oauth/v1/register', this.controller.registerUser())
    this.router.post('/oauth/v1/login', this.controller.loginUser())

    return this.router
  }
}
