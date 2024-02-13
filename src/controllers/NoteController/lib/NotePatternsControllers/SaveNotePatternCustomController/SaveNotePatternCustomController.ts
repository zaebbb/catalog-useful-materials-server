import {
  createNotePatternCustom,
  type CustomTypePatternBody, editNotePatternCustom,
} from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import { NoteCustomPatternValidator } from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternCustomRequest extends Request {
  body: Omit<CustomTypePatternBody, | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternCustomController = async (
  req: NotePatternCustomRequest,
  res: Response
) => {
  const noteData = req.body
  const tagsIds = JSON.parse(noteData.tagsIds)
  const fields = JSON.parse(noteData.stringFields)

  const validator: NoteCustomPatternValidator = new NoteCustomPatternValidator({
    ...noteData,
    tagsIds,
    fields,
    files: req.files,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternCustom({
      ...noteData,
      tagsIds,
      stringFields: fields,
      files: req.files,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternCustom({
      ...noteData,
      tagsIds,
      stringFields: fields,
      files: req.files,
    })
  }

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
