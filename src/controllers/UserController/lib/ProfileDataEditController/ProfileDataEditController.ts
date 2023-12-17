import { editProfileData, getUserTokenId, type UserRequest } from '@model/UserModel'
import { type UserProfile } from '@model/UserModel/lib/types/UserModel'
import { FileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { getFile } from '@utils/fileSystem/getFile'
import { ProfileValidator } from '@validator/UserValidator'
import { type Response } from 'express'

export interface ProfileEditRequest extends UserRequest {
  body: UserProfile
}

export const ProfileDataEditController = async (
  req: ProfileEditRequest,
  res: Response
) => {
  const id = getUserTokenId(req)

  if (!id) {
    return AppResponse.accessDenied(res)
  }

  const userData = req.body

  const files = req.files
  const avatar = getFile(files?.avatar)

  const validator: ProfileValidator = new ProfileValidator({
    ...userData,
    avatar: avatar ?? undefined,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let avatarFilename = ''

  if (avatar) {
    const fileService = new FileService(avatar)
    await fileService.save()
    avatarFilename = fileService.getFilePath
  }

  const updateProfileData = await editProfileData(id, {
    ...userData,
    avatar: avatarFilename,
  })

  if (!updateProfileData) {
    return AppResponse.error(res, 'Произошла ошибка при сохранении данных')
  }

  return AppResponse.success(res, {
    ...userData,
    avatar: avatarFilename,
  })
}
