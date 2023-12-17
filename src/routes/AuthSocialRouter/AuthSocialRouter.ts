import {
  AuthGoogleController,
  GetGoogleClientIdController,
} from '@controller/AuthSocialController'
import { UserNotAuthMiddleware } from '@middleware/UserNotAuthMiddleware'
import { Router } from 'express'
import {
  GOOGLE_CLIENT_ID_ROUTE,
  GOOGLE_PROFILE_SAVE_ROUTE,
} from './authSocialRouterList'

export const AuthSocialRouter = (): Router => {
  const router = Router()

  router.get(GOOGLE_CLIENT_ID_ROUTE, UserNotAuthMiddleware, GetGoogleClientIdController)
  router.post(GOOGLE_PROFILE_SAVE_ROUTE, UserNotAuthMiddleware, AuthGoogleController)

  return router
}
