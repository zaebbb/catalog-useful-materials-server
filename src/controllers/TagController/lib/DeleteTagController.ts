import { tagDelete, tagIdExist } from '@model/TagModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export interface DeleteTagRequest extends Request {
  body: {
    id: string
  }
}

export const DeleteTagController = async (
  req: DeleteTagRequest,
  res: Response
) => {
  const {
    id,
  } = req.body

  const tag = await tagIdExist(Number(id))

  if (!tag) {
    return AppResponse.notFound(res, 'Элемент не найден')
  }

  await tagDelete(Number(id))

  return AppResponse.success(res, {
    isDeleted: true,
  })
}
