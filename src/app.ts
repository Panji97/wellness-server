import 'source-map-support/register'
import express, { type Express, type Request, type Response, type NextFunction, urlencoded, json } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status'
import createError from 'http-errors'

import { mongoClient } from './config/database'
import corsHandler from './config/cors'
import helmetHandler from './config/helmet'
import compression from './config/compression'
import filesSystem from './config/filesystems'
import morganNotes from './config/morgan'
import cookieHandler from './config/cookieparser'
import i18nHandler from './middlewares/language'
import indexRouter from './routes/index.routes'

const app: Express = express()

mongoClient.connect()

app.set('trust proxy', true)
app.use(helmetHandler())
app.use(corsHandler())
app.use(
  json({
    type: ['application/json', 'application/csp-report', 'application/reports+json']
  })
)
app.use(urlencoded({ extended: false }))
app.use(cookieHandler())
app.use(filesSystem())
app.use(morganNotes())
app.use(compression())
app.use(i18nHandler())
app.use(indexRouter())

// catch 404 and forward to error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  next(createError(NOT_FOUND))
})

/**
 * error handlers
 * development error handler
 * will print stacktrace
 */
if (process.env.NODE_ENV === 'development') {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    next(createError(INTERNAL_SERVER_ERROR, err))
  })
}

/**
 * production error handler
 * no stacktraces leaked to user
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(INTERNAL_SERVER_ERROR)
  res.send({
    message: err.message,
    error: {}
  })
})

app.set('port', process.env.PORT ?? 9090)
app.listen(app.get('port'))
