import { getAllNotesViewsSelect } from '@model/NotesViewsModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export const NotesViewListController = async (
  req: Request,
  res: Response
) => {
  const remoteData = await getAllNotesViewsSelect()

  return AppResponse.success(res, remoteData)
}
