import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import fileUpload from 'express-fileupload'
import { type ConfigOptions } from '../types/config'

export const expressLoader = (app: Express, options: ConfigOptions): void => {
  const {
    paths,
    clientApi,
  } = options

  app.use(cookieParser())
  app.use(cors({
    origin: [
      clientApi,
      'http://localhost:6006',
      'https://lh3.googleusercontent.com',
    ],
    credentials: true,
  }))
  app.use(bodyParser.urlencoded({
    extended: true,
  }))
  app.use(bodyParser.json())
  app.use(fileUpload())
  app.use(express.static(paths.staticPath))
  app.use(express.static(paths.uploadPath))
}
