import { createNotePatternService, type ServiceTypePattern } from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import {
  NoteServicePatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface CreateNotePatternServiceRequest extends Request {
  body: Omit<ServiceTypePattern, 'image' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const CreateNotePatternServiceController = async (
  req: CreateNotePatternServiceRequest,
  res: Response
) => {
  const noteData = req.body
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteServicePatternValidator = new NoteServicePatternValidator({
    ...noteData,
    tagsIds,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const noteCode = await createNotePatternService({
    ...noteData,
    tagsIds,
  })

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
