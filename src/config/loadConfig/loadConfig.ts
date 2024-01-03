import { type Express } from 'express'
import { corsLoader } from '../loaders/corsLoader'
import { expressLoader } from '../loaders/expressLoader'
import { type ConfigOptions } from '../types/config'

export const loadConfig = (app: Express, options: ConfigOptions): void => {
  expressLoader(app, options)
  corsLoader(app, options)
}
