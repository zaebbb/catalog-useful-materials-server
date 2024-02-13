import { type CategoryEdit, updateCategory } from '@model/CategoryModel'
import { AppResponse } from '@utils/AppResponse'
import { EditCategoryValidator } from '@validator/CategoryValidator'
import { type Request, type Response } from 'express'

export interface EditCategoryRequest extends Request {
  body: CategoryEdit
}

export const EditCategoryController = async (
  req: EditCategoryRequest,
  res: Response
) => {
  const categoryData = req.body

  const validator: EditCategoryValidator = new EditCategoryValidator(categoryData)

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const category = await updateCategory(categoryData)

  if (!category) {
    return AppResponse.error(res, 'Произошла ошибка при создании категории')
  }

  return AppResponse.success(res, {
    isUpdated: true,
  })
}
