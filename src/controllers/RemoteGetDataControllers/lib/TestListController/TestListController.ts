import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export const TestListController = async (
  req: Request,
  res: Response
) => {
  const remoteData: SelectItems = [
    { id: 0, content: 'Тестовые данные', code: 'test-1' },
    { id: 1, content: 'Тестовые данные 2', code: 'test-2' },
    { id: 2, content: 'Тестовые данные 3', code: 'test-3' },
  ]

  return AppResponse.success(res, remoteData)
}
