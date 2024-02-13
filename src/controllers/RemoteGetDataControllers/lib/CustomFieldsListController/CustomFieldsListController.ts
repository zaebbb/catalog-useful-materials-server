import { getAllCustomFieldsSelect } from '@model/CustomFieldModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response, type Request } from 'express'

export const CustomFieldsListController = async (
  req: Request,
  res: Response
) => {
  const remoteData = await getAllCustomFieldsSelect()

  return AppResponse.success(res, remoteData)
}
