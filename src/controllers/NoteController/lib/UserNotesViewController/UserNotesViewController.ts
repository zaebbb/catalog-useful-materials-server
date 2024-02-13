import { fetchUserNotes } from '@model/NotesModel'
import { type UserRequest } from '@model/UserModel'
import { type JwtVerifyUserData } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { jwtVerify } from '@utils/jwt'
import { type Response } from 'express'

export interface UserNotesViewControllerRequest extends UserRequest {
  query: {
    description: string
    categoryId: string
    typeId: string
    viewId: string
    tagsIds: string
    page: string
  }
}

export const UserNotesViewController = async (
  req: UserNotesViewControllerRequest,
  res: Response
) => {
  const { Authorization: token } = req.cookies
  const options = req.query

  if (!token) {
    return AppResponse.accessDenied(res)
  }

  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!jwtData?.id) {
    return AppResponse.internalError(res)
  }

  const notes = await fetchUserNotes(jwtData?.id, options)

  return AppResponse.success(res, notes)
}
