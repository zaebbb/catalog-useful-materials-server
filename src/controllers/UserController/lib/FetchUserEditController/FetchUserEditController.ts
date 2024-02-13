import { getUserEditFetchEmail } from '@model/UserModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export interface FetchDataRequest extends Request {
  body: {
    email: string
  }
}

export const FetchUserEditController = async (
  req: FetchDataRequest,
  res: Response
) => {
  const body = req.body

  if (!body.email) {
    return AppResponse.notFound(res, 'Элемент не найден')
  }

  const fetchData = await getUserEditFetchEmail(body.email)

  return AppResponse.success(res, fetchData)
}
