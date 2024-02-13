import { getAllUsers } from '@model/UserModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export const AllUsersController = async (
  req: Request,
  res: Response
) => {
  const users = await getAllUsers()

  return AppResponse.success(res, users)
}
