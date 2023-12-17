import { isExistUser } from '@model/UserModel/lib/query/isExistUser'
import { type JwtVerifyUserData, type UserRequest } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { jwtVerify } from '@utils/jwt'
import { type NextFunction, type Response } from 'express'

export const UserAuthMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { Authorization: token } = req.cookies

  if (!token) {
    return AppResponse.accessDenied(res)
  }

  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!jwtData) {
    return AppResponse.accessDenied(res)
  }

  const isUser = await isExistUser(jwtData.id)

  if (!isUser) {
    return AppResponse.accessDenied(res)
  }

  next()
}
