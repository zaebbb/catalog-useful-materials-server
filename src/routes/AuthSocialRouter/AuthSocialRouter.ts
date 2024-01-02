import {
  AuthGoogleController,
  GetGoogleClientIdController,
  GetVkAppIdController,
  GetVkUserDataController,
} from '@controller/AuthSocialController'
import { UserNotAuthMiddleware } from '@middleware/UserNotAuthMiddleware'
import { Router } from 'express'
import {
  GOOGLE_CLIENT_ID_ROUTE,
  GOOGLE_PROFILE_SAVE_ROUTE,
  VK_ACCESS_TOKEN_ROUTE,
  VK_GET_USER_DATA_ROUTE,
} from './authSocialRouterList'

export const AuthSocialRouter = (): Router => {
  const router = Router()

  router.get(GOOGLE_CLIENT_ID_ROUTE, UserNotAuthMiddleware, GetGoogleClientIdController)
  router.post(GOOGLE_PROFILE_SAVE_ROUTE, UserNotAuthMiddleware, AuthGoogleController)
  router.get(VK_ACCESS_TOKEN_ROUTE, UserNotAuthMiddleware, GetVkAppIdController)
  router.post(VK_GET_USER_DATA_ROUTE, UserNotAuthMiddleware, GetVkUserDataController)

  return router
}
