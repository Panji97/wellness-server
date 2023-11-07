import { Request, Response, NextFunction } from 'express'
import { header, validationResult } from 'express-validator'
import { KEY } from '../gajah.json'
import passport from 'passport'
import passportJWT, { ExtractJwt } from 'passport-jwt'

export default class Authenticate {
  public async route(req: Request, res: Response, next: NextFunction) {
    await header('authorization')
      .exists()
      .withMessage('Please provide token')
      .isString()
      .withMessage('Token must be string')
      .run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(403).json({ status: false, errors: errors.array() })
    }

    const authorizationHeader = req.header('authorization')
    let result: string | null = null

    if (result === null) {
      return res.status(403).json({ status: false, errors: 'Token is not match' })
    }

    next()
  }

  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    await header('authorization').exists().withMessage('Please provide token').run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(403).json({ status: false, message: errors.array() })

    // Define your JWT option, including the secret key
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: KEY
    }

    const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
      // You can perform additional validation here if needed
      // For example, check if the user exists in your database
      // If the token is valid, you can attach the payload to the request object
      return done(null, jwtPayload)
    })

    // Use the JWT strategy with Passport
    passport.use(jwtStrategy)

    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
      try {
        if (err) {
          return res.status(401).json({ status: false, message: 'Invalid Token' })
        }

        if (!user) {
          return res.status(401).json({ status: false, message: 'Invalid Token' })
        }

        // Token is valid, attach the user object to the request for future use
        req.user = user.id

        next()
      } catch (error) {
        console.log(error)
      }
    })(req, res, next)
  }
}
