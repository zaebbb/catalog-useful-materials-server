import { createNoteType, type CreateNoteType } from '@model/NotesTypesModel'
import { AppResponse } from '@utils/AppResponse'
import { CreateNoteTypeValidator } from '@validator/NoteTypeValidator'
import { type Request, type Response } from 'express'

export interface CreateNoteTypeRequest extends Request {
  body: Omit<CreateNoteType, 'fields'> & {
    fields: string
  }
}

export const CreateNoteTypeController = async (
  req: CreateNoteTypeRequest,
  res: Response
) => {
  const noteTypeData = req.body
  const fields = JSON.parse(noteTypeData.fields)

  const validator: CreateNoteTypeValidator = new CreateNoteTypeValidator({
    ...noteTypeData,
    fields,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const isCreated = await createNoteType({
    ...noteTypeData,
    fields,
  })

  if (!isCreated) {
    return AppResponse.error(res, 'Произошла ошибка при создании шаблона заметки')
  }

  return AppResponse.success(res, {
    isCreated,
  })
}
