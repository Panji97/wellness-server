import { Router } from 'express'
import EventController from './event.controllers'

export default class EventRoutes {
  private router: Router
  private controller: EventController

  constructor() {
    this.router = Router()
    this.controller = new EventController()
  }

  routes(): Router {
    this.router.post('/v1/create', this.controller.create())
    this.router.get('/v1/show', this.controller.show())
    this.router.put('/v1/update/:id', this.controller.update())
    this.router.delete('/v1/delete/:id', this.controller.delete())

    return this.router
  }
}
