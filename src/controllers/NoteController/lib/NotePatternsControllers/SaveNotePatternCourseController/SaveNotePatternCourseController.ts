import { type CourseTypePattern, createNotePatternCourse, editNotePatternCourse } from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import {
  NoteCoursePatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternCourseRequest extends Request {
  body: Omit<CourseTypePattern, | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternCourseController = async (
  req: NotePatternCourseRequest,
  res: Response
) => {
  const noteData = req.body
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteCoursePatternValidator = new NoteCoursePatternValidator({
    ...noteData,
    tagsIds,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternCourse({
      ...noteData,
      tagsIds,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternCourse({
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
