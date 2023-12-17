import { type AuthGoogleParams, googleAuthUser, type UserRequest } from '@model/UserModel'
import { getUserId } from '@model/UserModel/lib/query/getUserId'
import { AppResponse } from '@utils/AppResponse'
import { jwtSign } from '@utils/jwt'
import { type Response } from 'express'

export type AuthGoogleRequestBody = AuthGoogleParams

export interface AuthGoogleRequest extends UserRequest {
  body: AuthGoogleRequestBody
}

export const AuthGoogleController = async (
  req: AuthGoogleRequest,
  res: Response
) => {
  const userData = req.body

  const authGoogleUserId = await googleAuthUser(userData)

  if (authGoogleUserId) {
    const token = jwtSign({ id: authGoogleUserId })
    const user = await getUserId(authGoogleUserId)

    return new AppResponse(res)
      .setStatus(200)
      .setCookie('Authorization', token, { maxAge: 3600 * 60 * 60 * 60 })
      .setJson({
        success: {
          auth: true,
          user,
        },
      })
      .execute()
  }

  return AppResponse.error(res, 'Произошла непредвиденная ошибка')
}
