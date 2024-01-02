import { type CourseTypePattern, createNotePatternCourse } from '@model/NotesModel'
import { AppResponse } from '@utils/AppResponse'
import {
  NoteCoursePatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface CreateNotePatternCourseRequest extends Request {
  body: Omit<CourseTypePattern, | 'tagsIds'> & {
    tagsIds: string
  }
}

export const CreateNotePatternCourseController = async (
  req: CreateNotePatternCourseRequest,
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

  const noteCode = await createNotePatternCourse({
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
