import {
  CreateNotePatternArticleController,
  CreateNotePatternCodeController,
  NoteViewDetailsController,
} from '@controller/NoteController'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { Router } from 'express'
import {
  CREATE_NOTE_PATTERN_ARTICLE_ROUTE, CREATE_NOTE_PATTERN_CODE_ROUTE,
  VIEW_NOTE_DETAILS_ROUTE,
} from './NotesRouterList'

export const NotesRouter = (): Router => {
  const router = Router()

  router.post(CREATE_NOTE_PATTERN_ARTICLE_ROUTE, UserAuthMiddleware, CreateNotePatternArticleController)
  router.post(CREATE_NOTE_PATTERN_CODE_ROUTE, UserAuthMiddleware, CreateNotePatternCodeController)
  router.get(VIEW_NOTE_DETAILS_ROUTE, UserAuthMiddleware, NoteViewDetailsController)

  return router
}
