import { I18n } from 'i18n'
import path from 'path'

const i18n = new I18n({
  // setup some locales - other locales default to en silently
  locales: ['en', 'id'],
  // fallback from Dutch to German and from any localized German (de-at, de-li etc.) to German
  fallbacks: { id: 'en' },
  // you may alter a site wide default locale
  defaultLocale: 'id',
  // sets a custom cookie name to parse locale settings from - defaults to NULL
  cookie: 'locales',
  // sets a custom header name to read the language preference from - accept-language header by default
  header: 'accept-language',
  // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
  queryParameter: 'locales',
  // where to store json files - defaults to './locales' relative to modules directory
  directory: path.join(__dirname, '../locales'),
  // control mode on directory creation - defaults to NULL which defaults to umask of process user. Setting has no effect on win.
  directoryPermissions: '755',
  // watch for changes in JSON files to reload locale on updates - defaults to false
  autoReload: true,
  // whether to write new locale information to disk - defaults to true
  updateFiles: true,
  // sync locale information across all files - defaults to false
  syncFiles: true,
  // enable object notation
  objectNotation: true,
  // object or [obj1, obj2] to bind the i18n api and current locale to - defaults to null
  register: global,
  // hash to specify different aliases for i18n's internal methods to apply on the request/response objects (method -> alias).
  // note that this will *not* overwrite existing properties with the same name
  api: {
    __: 'translate', // now req.__ becomes req.t
    __n: 'tn' // and req.__n can be called as req.tn
  }
})

export default i18n
