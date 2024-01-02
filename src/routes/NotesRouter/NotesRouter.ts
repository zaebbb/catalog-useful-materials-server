import {
  CreateNotePatternArticleController,
  CreateNotePatternCodeController,
  NoteViewDetailsController,
  CreateNotePatternIssueController,
  CreateNotePatternLayoutController,
  CreateNotePatternServiceController,
  CreateNotePatternBookController,
  CreateNotePatternVideoController,
  CreateNotePatternTechnologyController,
  CreateNotePatternCourseController,
  UserNotesViewController,
} from '@controller/NoteController'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { Router } from 'express'
import {
  CREATE_NOTE_PATTERN_ARTICLE_ROUTE,
  CREATE_NOTE_PATTERN_BOOK_ROUTE,
  CREATE_NOTE_PATTERN_CODE_ROUTE,
  CREATE_NOTE_PATTERN_ISSUE_ROUTE,
  CREATE_NOTE_PATTERN_LAYOUT_ROUTE,
  CREATE_NOTE_PATTERN_SERVICE_ROUTE,
  CREATE_NOTE_PATTERN_VIDEO_ROUTE,
  CREATE_NOTE_PATTERN_TECHNOLOGY_ROUTE,
  CREATE_NOTE_PATTERN_COURSE_ROUTE,
  VIEW_NOTE_DETAILS_ROUTE, VIEW_NOTES_USER_ROUTE,
} from './NotesRouterList'

export const NotesRouter = (): Router => {
  const router = Router()

  router.post(CREATE_NOTE_PATTERN_ARTICLE_ROUTE, UserAuthMiddleware, CreateNotePatternArticleController)
  router.post(CREATE_NOTE_PATTERN_CODE_ROUTE, UserAuthMiddleware, CreateNotePatternCodeController)
  router.post(CREATE_NOTE_PATTERN_ISSUE_ROUTE, UserAuthMiddleware, CreateNotePatternIssueController)
  router.post(CREATE_NOTE_PATTERN_LAYOUT_ROUTE, UserAuthMiddleware, CreateNotePatternLayoutController)
  router.post(CREATE_NOTE_PATTERN_SERVICE_ROUTE, UserAuthMiddleware, CreateNotePatternServiceController)
  router.post(CREATE_NOTE_PATTERN_BOOK_ROUTE, UserAuthMiddleware, CreateNotePatternBookController)
  router.post(CREATE_NOTE_PATTERN_VIDEO_ROUTE, UserAuthMiddleware, CreateNotePatternVideoController)
  router.post(CREATE_NOTE_PATTERN_TECHNOLOGY_ROUTE, UserAuthMiddleware, CreateNotePatternTechnologyController)
  router.post(CREATE_NOTE_PATTERN_COURSE_ROUTE, UserAuthMiddleware, CreateNotePatternCourseController)
  router.get(VIEW_NOTE_DETAILS_ROUTE, UserAuthMiddleware, NoteViewDetailsController)
  router.get(VIEW_NOTES_USER_ROUTE, UserAuthMiddleware, UserNotesViewController)

  return router
}
