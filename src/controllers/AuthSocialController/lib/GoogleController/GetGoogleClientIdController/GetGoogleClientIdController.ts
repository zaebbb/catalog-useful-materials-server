import { type UserRequest } from '@model/UserModel'
import { AppResponse } from '@utils/AppResponse'
import { jwtSign } from '@utils/jwt'
import dotenv from 'dotenv'
import { type Response } from 'express'

dotenv.config()

export const GetGoogleClientIdController = (
  req: UserRequest,
  res: Response
): Response => AppResponse.success(res, {
  token: jwtSign({ token: process.env.OAUTH_GOOGLE_CLIENT_ID }),
})
