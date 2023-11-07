import { Request, Response, NextFunction } from 'express'
import i18n from '../config/language'

const i18nHandler = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const acceptLanguage = req.headers['accept-language']
    const availableLocales = i18n.getLocales()

    // Check if accept-language header is present and valid
    if (acceptLanguage && availableLocales.includes(acceptLanguage)) {
      i18n.setLocale(req, acceptLanguage)
    }

    // Initialize i18n module
    i18n.init(req, res, next)
  }
}

export default i18nHandler
