import { type CategoryCreated, createCategory } from '@model/CategoryModel'
import { AppResponse } from '@utils/AppResponse'
import { CreateCategoryValidator } from '@validator/CategoryValidator'
import { type Request, type Response } from 'express'

export interface CreateCategoryRequest extends Request {
  body: CategoryCreated
}

export const CreateCategoryController = async (
  req: CreateCategoryRequest,
  res: Response
) => {
  const categoryData = req.body

  const validator: CreateCategoryValidator = new CreateCategoryValidator(categoryData)

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const category = await createCategory(categoryData)

  if (!category) {
    return AppResponse.error(res, 'Произошла ошибка при создании категории')
  }

  return AppResponse.success(res, {
    isCreated: true,
  })
}
