import { Router } from 'express'
import UserController from './users.controllers'

export default class UserRoutes {
  private router: Router
  private controller: UserController

  constructor() {
    this.router = Router()
    this.controller = new UserController()
  }

  routes(): Router {
    this.router.get('/v1/showAll', this.controller.showAll())
    this.router.get('/v1/show', this.controller.showId())
    this.router.put('/v1/update/:id', this.controller.update())

    return this.router
  }
}
