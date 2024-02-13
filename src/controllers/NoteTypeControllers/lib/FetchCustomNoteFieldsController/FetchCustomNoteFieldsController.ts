import { fetchCustomFieldsNoteTypeId } from '@model/NotesTypesModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export interface FetchCustomNoteFieldsControllerRequest extends Request {
  body: {
    id: number
  }
}

export const FetchCustomNoteFieldsController = async (
  req: FetchCustomNoteFieldsControllerRequest,
  res: Response
) => {
  const noteTypeId = req.body.id
  const fields = await fetchCustomFieldsNoteTypeId(noteTypeId)

  return AppResponse.success(res, {
    fields,
  })
}
