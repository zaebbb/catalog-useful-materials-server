import { getCategoryCode } from '@model/CategoryModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export interface RequestController extends Request {
  body: {
    code: string
  }
}

export const FetchCategoryDataController = async (
  req: RequestController,
  res: Response
) => {
  const data = req.body
  const category = await getCategoryCode(data.code)

  if (category) {
    return AppResponse.success(res, category)
  }

  return AppResponse.notFound(res, 'Категория не обнаружен')
}
