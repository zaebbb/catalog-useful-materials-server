import { createTag, type TagCreated } from '@model/TagModel'
import { AppResponse } from '@utils/AppResponse'
import { CreateTagValidator } from '@validator/TagValidator'
import { type Request, type Response } from 'express'

export interface CreateTagRequest extends Request {
  body: TagCreated
}

export const CreateTagController = async (
  req: CreateTagRequest,
  res: Response
) => {
  const tagData = req.body

  const validator: CreateTagValidator = new CreateTagValidator(tagData)

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const tag = await createTag(tagData)

  if (!tag) {
    return AppResponse.error(res, 'Произошла ошибка при создании тега')
  }

  return AppResponse.success(res, {
    isCreated: true,
  })
}
