import serveStatic from 'serve-static'
import { join } from 'path'

const filesSystem = () => {
  return serveStatic(join(__dirname, '../../public'))
}

export default filesSystem
