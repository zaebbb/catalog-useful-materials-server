import {
  createNotePatternService, editNotePatternService,
  type ServiceTypePattern,
} from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import {
  NoteServicePatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternServiceRequest extends Request {
  body: Omit<ServiceTypePattern, 'image' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternServiceController = async (
  req: NotePatternServiceRequest,
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

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternService({
      ...noteData,
      tagsIds,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternService({
      ...noteData,
      tagsIds,
    })
  }

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
