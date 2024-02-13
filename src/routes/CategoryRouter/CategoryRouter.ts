import {
  AllCategoriesController,
  CreateCategoryController,
  DeleteCategoryController, EditCategoryController, FetchCategoryDataController,
} from '@controller/CategoryController'
import { UserAdminMiddleware } from '@middleware/UserAdminMiddleware'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { Router } from 'express'
import {
  CATEGORY_ALL_ROUTE,
  CATEGORY_CREATE_ROUTE,
  CATEGORY_DELETE_ROUTE,
  CATEGORY_FETCH_EDIT_ROUTE,
  CATEGORY_EDIT_ROUTE,
} from './CategoryRouterList'

export const CategoryRouter = (): Router => {
  const router = Router()

  router.get(CATEGORY_ALL_ROUTE, UserAuthMiddleware, UserAdminMiddleware, AllCategoriesController)
  router.post(CATEGORY_CREATE_ROUTE, UserAuthMiddleware, UserAdminMiddleware, CreateCategoryController)
  router.post(CATEGORY_FETCH_EDIT_ROUTE, UserAuthMiddleware, UserAdminMiddleware, FetchCategoryDataController)
  router.post(CATEGORY_EDIT_ROUTE, UserAuthMiddleware, UserAdminMiddleware, EditCategoryController)
  router.post(CATEGORY_DELETE_ROUTE, UserAuthMiddleware, UserAdminMiddleware, DeleteCategoryController)

  return router
}
