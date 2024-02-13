import { saveUserEdit } from '@model/UserModel'
import { type UserEditData } from '@model/UserModel/lib/types/UserModel'
import { AppResponse } from '@utils/AppResponse'
import { UserEditValidator } from '@validator/UserValidator'
import { type Request, type Response } from 'express'

export interface SaveUserEditRequest extends Request {
  body: UserEditData
}

export const SaveUserEditController = async (
  req: SaveUserEditRequest,
  res: Response
) => {
  const body = req.body

  const validator: UserEditValidator = new UserEditValidator(body)

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const isSaveData = await saveUserEdit(body)

  if (isSaveData) {
    return AppResponse.success(res, {
      isSave: isSaveData,
    })
  }

  return AppResponse.error(res, 'Произошла ошибка при сохранении данных')
}
