import { fetchNoteData } from '@model/NotesModel'
import { NotesViewsCodeList } from '@model/NotesViewsModel/lib/types/NotesViewsModel'
import { type UserRequest } from '@model/UserModel'
import { type JwtVerifyUserData } from '@model/UserModel/lib/types/User'
import { AppResponse } from '@utils/AppResponse'
import { jwtVerify } from '@utils/jwt'
import { type Response } from 'express'

export interface NoteViewDetailsControllerRequest extends UserRequest {
  query: {
    id?: string
  }
}

export const NoteViewDetailsController = async (
  req: NoteViewDetailsControllerRequest,
  res: Response
) => {
  const code = req.query.id
  const { Authorization: token } = req.cookies

  if (!code) {
    return AppResponse.notFound(res, 'Заметка не найдена')
  }

  if (!token) {
    return AppResponse.accessDenied(res)
  }

  const note = await fetchNoteData(code)
  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!note) {
    return AppResponse.notFound(res, 'Заметка не найдена')
  }

  if (
    note.user.id !== jwtData?.id &&
    note.view.code === NotesViewsCodeList.PRIVATE
  ) {
    return AppResponse.accessDenied(res)
  }

  return AppResponse.success(res, note)
}
