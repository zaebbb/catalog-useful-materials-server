import cors from 'cors'
import { type Express, type NextFunction, type Request, type Response } from 'express'
import { type ConfigOptions } from '../types/config'

export const corsLoader = (app: Express, options: ConfigOptions): void => {
  const {
    clientApi,
    api,
  } = options

  const origin: string[] = [
    clientApi,
    'http://localhost:6006',
    'http://localhost:5500',
    'https://lh3.googleusercontent.com',
  ]

  app.use(cors({
    origin,
    credentials: true,
  }))

  app.use(api, (req: Request, res: Response, next: NextFunction) => {
    res.set('Access-Control-Allow-Origin', clientApi)
    next()
  })
}
