import { type UserAuthValues } from '@model/UserModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export const LogoutController = async (
  req: Request<any, any, UserAuthValues>,
  res: Response
): Promise<Response> => {
  res.clearCookie('Authorization')
  return AppResponse.success(res, {})
}
