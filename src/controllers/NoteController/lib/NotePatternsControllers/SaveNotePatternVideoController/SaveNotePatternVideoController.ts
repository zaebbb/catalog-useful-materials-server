import {
  createNotePatternVideo,
  editNotePatternVideo,
  type VideoTypePattern,
} from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import {
  NoteVideoPatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternVideoRequest extends Request {
  body: Omit<VideoTypePattern, | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternVideoController = async (
  req: NotePatternVideoRequest,
  res: Response
) => {
  const noteData = req.body
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteVideoPatternValidator = new NoteVideoPatternValidator({
    ...noteData,
    tagsIds,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternVideo({
      ...noteData,
      tagsIds,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternVideo({
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
