import { Express } from 'express'
import Multer from 'multer'

export default class MulterConfig {
  private multer: Multer

  constructor() {
    this.multer = new Multer()
  }
}
