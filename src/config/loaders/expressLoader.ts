import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express, { type Express } from 'express'
import fileUpload from 'express-fileupload'
import { type ConfigOptions } from '../types/config'

export const expressLoader = (app: Express, options: ConfigOptions): void => {
  const {
    paths,
    mode,
    api,
  } = options

  if (mode === 'production') {
    app.use(compression())
  }

  app.use(cookieParser())
  app.use(bodyParser.urlencoded({
    extended: true,
  }))
  app.use(bodyParser.json())
  app.use(fileUpload())
  app.use(api + '/static', UserAuthMiddleware, express.static(paths.staticPath))
  app.use(api + '/upload', UserAuthMiddleware, express.static(paths.uploadPath))
}
