import { getUserTokenId, type UserRequest } from '@model/UserModel'
import { getUserProfileData } from '@model/UserModel'
import { AppResponse } from '@utils/AppResponse'
import { type Response } from 'express'

export const ProfileDataController = async (
  req: UserRequest,
  res: Response
) => {
  const id = getUserTokenId(req)

  if (!id) {
    return AppResponse.accessDenied(res)
  }

  const profileData = await getUserProfileData(id)

  if (!profileData) {
    return AppResponse.accessDenied(res)
  }

  return AppResponse.success(res, profileData ?? {})
}
