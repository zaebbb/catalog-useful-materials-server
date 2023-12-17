import {
  type CodeTypePattern,
  createNotePatternCode,
} from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import { NoteCodePatternValidator } from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface CreateNotePatternCodeRequest extends Request {
  body: Omit<CodeTypePattern, 'tagsIds'> & {
    tagsIds: string
  }
}

export const CreateNotePatternCodeController = async (
  req: CreateNotePatternCodeRequest,
  res: Response
) => {
  const noteData = req.body
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteCodePatternValidator = new NoteCodePatternValidator({
    ...noteData,
    tagsIds,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const noteCode = await createNotePatternCode({
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
