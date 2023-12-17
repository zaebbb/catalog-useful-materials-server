import { loadConfig } from '@config/loadConfig/loadConfig'
import { startServer } from '@config/startServer'
import { type ConfigOptions } from '@config/types/config'
import { AuthSocialRouter, GOOGLE_ROUTE } from '@router/AuthSocialRouter'
import { CREATE_NOTES_ROUTE, NotesRouter } from '@router/NotesRouter'
import { REMOTE_DATA_ROUTE, RemoteDataRouter } from '@router/RemoteDataRouter'
import { USER_ROUTE, UserRouter } from '@router/UserRouter'
import express, { type Express } from 'express'

export const application = (options: ConfigOptions): void => {
  const app: Express = express()
  loadConfig(app, options)

  const {
    api,
  } = options

  app.use(api + USER_ROUTE, UserRouter())
  app.use(api + GOOGLE_ROUTE, AuthSocialRouter())
  app.use(api + REMOTE_DATA_ROUTE, RemoteDataRouter())
  app.use(api + CREATE_NOTES_ROUTE, NotesRouter())

  startServer(app, options)
}
