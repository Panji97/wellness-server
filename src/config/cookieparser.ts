import { RequestHandler } from 'express'
import cookieParser from 'cookie-parser'

const cookieHandler = (): RequestHandler => {
  return cookieParser()
}

export default cookieHandler
