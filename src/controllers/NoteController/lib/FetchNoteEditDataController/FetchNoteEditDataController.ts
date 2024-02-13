import { fetchEditNoteData } from '@model/NotesModel'
import { type UserRequest } from '@model/UserModel'
import { type JwtVerifyUserData } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { jwtVerify } from '@utils/jwt'
import { type Response } from 'express'

export interface FetchDataRequest extends UserRequest {
  body: {
    code: string
  }
}

export const FetchNoteEditDataController = async (
  req: FetchDataRequest,
  res: Response
) => {
  const { Authorization: token } = req.cookies
  const data = req.body

  if (!token || !data.code) {
    return AppResponse.accessDenied(res)
  }

  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!jwtData?.id) {
    return AppResponse.internalError(res)
  }

  const note = await fetchEditNoteData(data.code, jwtData?.id)

  if (!note) {
    return AppResponse.notFound(res, 'Заметка не найдена')
  }

  return AppResponse.success(res, note)
}
