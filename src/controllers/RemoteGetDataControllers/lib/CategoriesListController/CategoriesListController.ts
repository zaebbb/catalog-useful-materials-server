import { getAllCategoriesSelect } from '@model/CategoryModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export const CategoriesListController = async (
  req: Request,
  res: Response
) => {
  const remoteData = await getAllCategoriesSelect()

  return AppResponse.success(res, remoteData)
}
