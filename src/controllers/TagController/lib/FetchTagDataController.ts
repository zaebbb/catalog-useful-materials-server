import { getTagCode } from '@model/TagModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export interface RequestController extends Request {
  body: {
    code: string
  }
}

export const FetchTagDataController = async (
  req: RequestController,
  res: Response
) => {
  const data = req.body
  const tag = await getTagCode(data.code)

  if (tag) {
    return AppResponse.success(res, tag)
  }

  return AppResponse.notFound(res, 'Тег не обнаружен')
}
