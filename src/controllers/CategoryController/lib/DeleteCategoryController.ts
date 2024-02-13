import { categoryDelete, categoryIdExist } from '@model/CategoryModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export interface DeleteCategoryRequest extends Request {
  body: {
    id: string
  }
}

export const DeleteCategoryController = async (
  req: DeleteCategoryRequest,
  res: Response
) => {
  const {
    id,
  } = req.body

  const tag = await categoryIdExist(Number(id))

  if (!tag) {
    return AppResponse.notFound(res, 'Элемент не найден')
  }

  await categoryDelete(Number(id))

  return AppResponse.success(res, {
    isDeleted: true,
  })
}
