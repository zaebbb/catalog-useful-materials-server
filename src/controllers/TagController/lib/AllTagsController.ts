import { getAllTags } from '@model/TagModel'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'

export const AllTagsController = async (
  req: Request,
  res: Response
) => {
  const tags = await getAllTags()

  return AppResponse.success(res, tags)
}
