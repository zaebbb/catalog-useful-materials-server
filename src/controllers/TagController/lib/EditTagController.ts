import { type TagEdit, updateTag } from '@model/TagModel'
import { AppResponse } from '@utils/AppResponse'
import { EditTagValidator } from '@validator/TagValidator'
import { type Request, type Response } from 'express'

export interface EditTagRequest extends Request {
  body: TagEdit
}

export const EditTagController = async (
  req: EditTagRequest,
  res: Response
) => {
  const tagData = req.body

  const validator: EditTagValidator = new EditTagValidator(tagData)

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const tag = await updateTag(tagData)

  if (!tag) {
    return AppResponse.error(res, 'Произошла ошибка при создании тега')
  }

  return AppResponse.success(res, {
    isUpdated: true,
  })
}
