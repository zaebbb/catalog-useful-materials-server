import { AppResponse } from '@utils/AppResponse'
import { jwtSign } from '@utils/jwt'
import dotenv from 'dotenv'
import { type Request, type Response } from 'express'

dotenv.config()

export const GetVkAppIdController = async (
  req: Request,
  res: Response
) => AppResponse.success(res, {
  appId: jwtSign({ appId: process.env.VK_CLIENT_ID }),
})
