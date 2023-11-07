import { Router } from 'express'
import RoleControllers from './roles.controllers'

export default class RoleRoutes {
  private router: Router
  private controller: RoleControllers

  constructor() {
    this.router = Router()
    this.controller = new RoleControllers()
  }

  routes(): Router {
    this.router.post('/v1/create', this.controller.create())

    return this.router
  }
}
