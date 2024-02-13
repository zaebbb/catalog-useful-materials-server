import {
  CategoriesListController, CustomFieldsListController,
  NotesTypesListController,
  NotesViewListController,
  TagsListController,
  TestListController,
} from '@controller/RemoteGetDataControllers'
import { UserAdminMiddleware } from '@middleware/UserAdminMiddleware'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { Router } from 'express'
import {
  CATEGORIES_LIST_ROUTE, CUSTOM_FIELDS_LIST_ROUTE,
  NOTES_TYPES_LIST_ROUTE,
  NOTES_VIEWS_LIST_ROUTE,
  TAGS_LIST_ROUTE,
  TEST_LIST_ROUTE,
} from './RemoteDataRouterList'

export const RemoteDataRouter = (): Router => {
  const router = Router()

  router.get(NOTES_TYPES_LIST_ROUTE, UserAuthMiddleware, NotesTypesListController)
  router.get(NOTES_VIEWS_LIST_ROUTE, UserAuthMiddleware, NotesViewListController)
  router.get(CATEGORIES_LIST_ROUTE, UserAuthMiddleware, CategoriesListController)
  router.get(CUSTOM_FIELDS_LIST_ROUTE, UserAuthMiddleware, UserAdminMiddleware, CustomFieldsListController)
  router.get(TAGS_LIST_ROUTE, UserAuthMiddleware, TagsListController)
  router.get(TEST_LIST_ROUTE, TestListController)

  return router
}
