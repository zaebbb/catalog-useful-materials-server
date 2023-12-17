import { getAllTagsSelect } from '@model/TagModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export const TagsListController = async (
  req: Request,
  res: Response
) => {
  const remoteData = await getAllTagsSelect()

  return AppResponse.success(res, remoteData)
}
