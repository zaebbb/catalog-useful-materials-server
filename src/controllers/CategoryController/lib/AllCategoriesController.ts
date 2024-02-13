import { getAllCategories } from '@model/CategoryModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export const AllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const tags = await getAllCategories()

  return AppResponse.success(res, tags)
}
