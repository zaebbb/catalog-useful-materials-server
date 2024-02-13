import { loadConfig } from '@config/loadConfig/loadConfig'
import { startServer } from '@config/startServer'
import { type ConfigOptions } from '@config/types/config'
import { AuthSocialRouter, SOCIAL_ROUTE } from '@router/AuthSocialRouter'
import { CATEGORY_ROUTE, CategoryRouter } from '@router/CategoryRouter'
import { NOTE_TYPE_ROUTE, NoteTypeRouter } from '@router/NoteTypeRouter'
import { CREATE_NOTES_ROUTE, NotesRouter } from '@router/NotesRouter'
import { REMOTE_DATA_ROUTE, RemoteDataRouter } from '@router/RemoteDataRouter'
import { TAG_ROUTE, TagRouter } from '@router/TagRouter'
import { UPLOAD_ROUTE, UploadRouter } from '@router/UploadRouter'
import { USER_ROUTE, UserRouter } from '@router/UserRouter'
import express, { type Express } from 'express'

export const application = (options: ConfigOptions): void => {
  const app: Express = express()
  loadConfig(app, options)

  const {
    api,
  } = options

  app.use(api + USER_ROUTE, UserRouter())
  app.use(api + SOCIAL_ROUTE, AuthSocialRouter())
  app.use(api + REMOTE_DATA_ROUTE, RemoteDataRouter())
  app.use(api + CREATE_NOTES_ROUTE, NotesRouter())
  app.use(api + UPLOAD_ROUTE, UploadRouter())
  app.use(api + TAG_ROUTE, TagRouter())
  app.use(api + CATEGORY_ROUTE, CategoryRouter())
  app.use(api + NOTE_TYPE_ROUTE, NoteTypeRouter())

  startServer(app, options)
}
