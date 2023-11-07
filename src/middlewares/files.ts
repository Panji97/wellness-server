import multer, { Multer } from 'multer'
import { RequestHandler } from 'express'

export class MulterConfig {
  private uploadImage: Multer
  private uploadVideo: Multer
  private uploadFile: Multer
  private uploadXlsx: Multer

  constructor() {
    this.uploadImage = multer({ dest: 'public/img' })
    this.uploadVideo = multer({ dest: 'public/video' })
    this.uploadFile = multer({ dest: 'public/storage' })
    this.uploadXlsx = multer({ dest: 'public/settlement' })
  }

  getImageUpload(): RequestHandler {
    return this.uploadImage.array('image')
  }

  getVideoUpload(): RequestHandler {
    return this.uploadVideo.array('video')
  }

  getFileUpload(): RequestHandler {
    return this.uploadFile.array('files')
  }

  getXlsxUpload(): RequestHandler {
    return this.uploadXlsx.array('xlsx')
  }
}
