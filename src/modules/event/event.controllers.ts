import { Request, Response } from 'express'
import ErrorHandler from '../error'
import EventService from './event.service'

export default class EventController extends ErrorHandler {
  private service

  constructor() {
    super()
    this.service = new EventService()
  }

  public create() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.createEvent(req.body, String(req.user))

        return res.status(201).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }

  public show() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.showEvent(String(req.user))

        return res.status(200).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }

  public update() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.updateEvent(req.body, String(req.user), req.params.id)

        return res.status(200).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }

  public delete() {
    return async (req: Request, res: Response) => {
      try {
        const result = await this.service.deleteEvent(req.params.id)

        return res.status(200).json({ message: result.message, result: result.result })
      } catch (error) {
        this.handleError(error, req, res)
      }
    }
  }
}
