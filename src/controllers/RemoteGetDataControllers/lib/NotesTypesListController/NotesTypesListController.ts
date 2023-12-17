import { getAllNotesTypesSelect } from '@model/NotesTypesModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export const NotesTypesListController = async (
  req: Request,
  res: Response
) => {
  const remoteData = await getAllNotesTypesSelect()

  return AppResponse.success(res, remoteData)
}
