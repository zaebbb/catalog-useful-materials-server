import {
  CreateNoteTypeController,
  FetchCustomNoteFieldsController,
  AllNotesTypesController,
} from '@controller/NoteTypeControllers'
import { UserAdminMiddleware } from '@middleware/UserAdminMiddleware'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { Router } from 'express'
import {
  NOTE_TYPE_CREATE_ROUTE,
  NOTE_TYPE_FETCH_CUSTOM_FIELDS_ROUTE,
  NOTE_TYPE_ALL_ROUTE,
} from './NoteTypeRouterList'

export const NoteTypeRouter = (): Router => {
  const router = Router()

  router.get(NOTE_TYPE_ALL_ROUTE, UserAuthMiddleware, UserAdminMiddleware, AllNotesTypesController)
  router.post(NOTE_TYPE_CREATE_ROUTE, UserAuthMiddleware, UserAdminMiddleware, CreateNoteTypeController)
  router.post(
    NOTE_TYPE_FETCH_CUSTOM_FIELDS_ROUTE,
    UserAuthMiddleware,
    UserAdminMiddleware,
    FetchCustomNoteFieldsController
  )

  return router
}
