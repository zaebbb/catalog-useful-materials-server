import { fetchUserNotes } from '@model/NotesModel'
import { type UserRequest } from '@model/UserModel'
import { type JwtVerifyUserData } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { jwtVerify } from '@utils/jwt'
import { type Response } from 'express'

export const UserNotesViewController = async (
  req: UserRequest,
  res: Response
) => {
  const { Authorization: token } = req.cookies

  if (!token) {
    return AppResponse.accessDenied(res)
  }

  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!jwtData?.id) {
    return AppResponse.internalError(res)
  }

  const notes = await fetchUserNotes(jwtData?.id)

  if (!notes.length) {
    return AppResponse.notFound(res, 'Заметок не найдено')
  }

  return AppResponse.success(res, notes)
}
