import {
  NoteViewDetailsController,
  SaveNotePatternCourseController,
  UserNotesViewController,
  FetchNoteEditDataController,
  SaveNotePatternArticleController,
  SaveNotePatternBookController,
  SaveNotePatternVideoController,
  SaveNotePatternCodeController,
  SaveNotePatternServiceController,
  SaveNotePatternTechnologyController,
  SaveNotePatternIssueController, SaveNotePatternLayoutController, SaveNotePatternCustomController,
} from '@controller/NoteController'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { Router } from 'express'
import {
  SAVE_NOTE_PATTERN_COURSE_ROUTE,
  VIEW_NOTE_DETAILS_ROUTE,
  VIEW_NOTES_USER_ROUTE,
  FETCH_EDIT_NOTE_DATA_ROUTE,
  SAVE_NOTE_PATTERN_ARTICLE_ROUTE,
  SAVE_NOTE_PATTERN_BOOK_ROUTE,
  SAVE_NOTE_PATTERN_VIDEO_ROUTE,
  SAVE_NOTE_PATTERN_CODE_ROUTE,
  SAVE_NOTE_PATTERN_SERVICE_ROUTE,
  SAVE_NOTE_PATTERN_TECHNOLOGY_ROUTE,
  SAVE_NOTE_PATTERN_ISSUE_ROUTE,
  SAVE_NOTE_PATTERN_LAYOUT_ROUTE, SAVE_NOTE_PATTERN_CUSTOM_ROUTE,
} from './NotesRouterList'

export const NotesRouter = (): Router => {
  const router = Router()

  router.post(SAVE_NOTE_PATTERN_ARTICLE_ROUTE, UserAuthMiddleware, SaveNotePatternArticleController)
  router.post(SAVE_NOTE_PATTERN_CODE_ROUTE, UserAuthMiddleware, SaveNotePatternCodeController)
  router.post(SAVE_NOTE_PATTERN_ISSUE_ROUTE, UserAuthMiddleware, SaveNotePatternIssueController)
  router.post(SAVE_NOTE_PATTERN_LAYOUT_ROUTE, UserAuthMiddleware, SaveNotePatternLayoutController)
  router.post(SAVE_NOTE_PATTERN_SERVICE_ROUTE, UserAuthMiddleware, SaveNotePatternServiceController)
  router.post(SAVE_NOTE_PATTERN_BOOK_ROUTE, UserAuthMiddleware, SaveNotePatternBookController)
  router.post(SAVE_NOTE_PATTERN_VIDEO_ROUTE, UserAuthMiddleware, SaveNotePatternVideoController)
  router.post(SAVE_NOTE_PATTERN_TECHNOLOGY_ROUTE, UserAuthMiddleware, SaveNotePatternTechnologyController)
  router.post(SAVE_NOTE_PATTERN_COURSE_ROUTE, UserAuthMiddleware, SaveNotePatternCourseController)
  router.post(SAVE_NOTE_PATTERN_CUSTOM_ROUTE, UserAuthMiddleware, SaveNotePatternCustomController)
  router.post(FETCH_EDIT_NOTE_DATA_ROUTE, UserAuthMiddleware, FetchNoteEditDataController)
  router.get(VIEW_NOTE_DETAILS_ROUTE, UserAuthMiddleware, NoteViewDetailsController)
  router.post(VIEW_NOTES_USER_ROUTE, UserAuthMiddleware, UserNotesViewController)

  return router
}
