import { getAllNotesTypes } from '@model/NotesTypesModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export const AllNotesTypesController = async (
  req: Request,
  res: Response
) => {
  const tags = await getAllNotesTypes()

  return AppResponse.success(res, tags)
}
