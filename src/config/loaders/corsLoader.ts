import cors from 'cors'
import { type Express } from 'express'
import { type ConfigOptions } from '../types/config'

export const corsLoader = (app: Express, options: ConfigOptions): void => {
  const {
    clientApi,
  } = options

  app.use(cors({
    origin: [
      clientApi,
      'http://localhost:6006',
      'https://lh3.googleusercontent.com',
    ],
    credentials: true,
  }))
}
