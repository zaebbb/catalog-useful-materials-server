import {
  AuthController,
  LogoutController,
  ProfileDataController,
  ProfileDataEditController,
  RegisterController,
  UserCheckController,
  AllUsersController, FetchUserEditController, SaveUserEditController,
} from '@controller/UserController'
import { UserAdminMiddleware } from '@middleware/UserAdminMiddleware'
import { UserAuthMiddleware } from '@middleware/UserAuthMiddleware'
import { UserNotAuthMiddleware } from '@middleware/UserNotAuthMiddleware'
import { Router } from 'express'
import {
  USER_ROUTE_AUTH,
  USER_ROUTE_CHECK,
  USER_ROUTE_LOGOUT,
  USER_ROUTE_PROFILE_DATA,
  USER_ROUTE_PROFILE_DATA_EDIT,
  USER_ROUTE_REGISTER,
  USER_ALL_ROUTE,
  USER_ROUTE_ADMIN_USER_EDIT_DATA_FETCH,
  USER_ROUTE_ADMIN_USER_EDIT_DATA_SAVE,
} from './userRouterList'

export const UserRouter = (): Router => {
  const router = Router()

  router.post(USER_ROUTE_AUTH, UserNotAuthMiddleware, AuthController)
  router.get(USER_ALL_ROUTE, UserAuthMiddleware, UserAdminMiddleware, AllUsersController)
  router.post(USER_ROUTE_REGISTER, UserNotAuthMiddleware, RegisterController)
  router.post(USER_ROUTE_CHECK, UserAuthMiddleware, UserCheckController)
  router.get(USER_ROUTE_PROFILE_DATA, UserAuthMiddleware, ProfileDataController)
  router.get(USER_ROUTE_LOGOUT, UserAuthMiddleware, LogoutController)
  router.post(USER_ROUTE_PROFILE_DATA_EDIT, UserAuthMiddleware, ProfileDataEditController)
  router.post(USER_ROUTE_ADMIN_USER_EDIT_DATA_FETCH, UserAuthMiddleware, UserAdminMiddleware, FetchUserEditController)
  router.post(USER_ROUTE_ADMIN_USER_EDIT_DATA_SAVE, UserAuthMiddleware, UserAdminMiddleware, SaveUserEditController)

  return router
}
