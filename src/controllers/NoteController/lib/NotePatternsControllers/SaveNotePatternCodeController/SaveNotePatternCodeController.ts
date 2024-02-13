import {
  type CodeTypePattern,
  createNotePatternCode, editNotePatternCode,
} from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import { NoteCodePatternValidator } from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface SaveNotePatternCodeRequest extends Request {
  body: Omit<CodeTypePattern, 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternCodeController = async (
  req: SaveNotePatternCodeRequest,
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

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternCode({
      ...noteData,
      tagsIds,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternCode({
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
