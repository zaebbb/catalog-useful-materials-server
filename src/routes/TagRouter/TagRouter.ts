import {
  AllTagsController,
  CreateTagController,
  DeleteTagController,
  EditTagController,
  FetchTagDataController,
} from '@controller/TagController'
import { UserAdminMiddleware } from '@middleware/UserAdminMiddleware'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import {
  TAG_ALL_ROUTE,
  TAG_CREATE_ROUTE,
  TAG_FETCH_EDIT_ROUTE,
  TAG_EDIT_ROUTE,
  TAG_DELETE_ROUTE,
} from '@router/TagRouter/TagRouterList'
import { Router } from 'express'

export const TagRouter = (): Router => {
  const router = Router()

  router.get(TAG_ALL_ROUTE, UserAuthMiddleware, UserAdminMiddleware, AllTagsController)
  router.post(TAG_CREATE_ROUTE, UserAuthMiddleware, UserAdminMiddleware, CreateTagController)
  router.post(TAG_FETCH_EDIT_ROUTE, UserAuthMiddleware, UserAdminMiddleware, FetchTagDataController)
  router.post(TAG_EDIT_ROUTE, UserAuthMiddleware, UserAdminMiddleware, EditTagController)
  router.post(TAG_DELETE_ROUTE, UserAuthMiddleware, UserAdminMiddleware, DeleteTagController)

  return router
}
