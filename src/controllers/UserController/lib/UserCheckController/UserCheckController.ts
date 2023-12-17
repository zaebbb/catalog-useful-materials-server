import { getUserId } from '@model/UserModel/lib/query/getUserId'
import { type JwtVerifyUserData, type UserRequest } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { jwtVerify } from '@utils/jwt'
import { type Response } from 'express'

export const UserCheckController = async (
  req: UserRequest,
  res: Response
) => {
  const { Authorization: token } = req.cookies

  if (!token) {
    return AppResponse.accessDenied(res)
  }

  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!jwtData) {
    return AppResponse.accessDenied(res)
  }

  const user = await getUserId(jwtData.id)

  if (user) {
    return AppResponse.success(res, {
      user,
    })
  }

  return AppResponse.accessDenied(res)
}
