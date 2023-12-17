import { type UserRequest } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { type NextFunction, type Response } from 'express'

export const UserNotAuthMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { Authorization: token } = req.cookies

  if (token) {
    return AppResponse.accessDenied(res)
  }

  next()
}
