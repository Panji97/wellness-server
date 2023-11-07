import { Request, Response } from 'express'

export default class ErrorHandler {
  private async containsJSONObject(str: string): Promise<boolean> {
    try {
      const obj = JSON.parse(str)
      return typeof obj === 'object' && obj !== null
    } catch (error) {
      return false
    }
  }

  protected async handleError(err: any, req: Request, res: Response): Promise<void> {
    let error

    // Check if error is custom or not
    if (await this.containsJSONObject(err.message)) {
      error = JSON.parse(err.message)
    } else {
      error = err.message
    }

    // Handle the error in your desired way
    console.error(err)

    if (typeof error === 'object') {
      res.status(200).json({ status: false, message: error.message })
    } else {
      res.status(500).json({ status: false, message: error })
    }
  }
}
