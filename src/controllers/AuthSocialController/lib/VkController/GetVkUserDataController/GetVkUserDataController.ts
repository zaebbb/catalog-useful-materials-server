import { createUserVk, type UserRequest } from '@model/UserModel'
import { getUserEmail } from '@model/UserModel'
import { getUserId } from '@model/UserModel/lib/query/getUserId'
import { isExistUserEmail } from '@model/UserModel/lib/query/isExistsUserEmail'
import { vk } from '@service/VKService'
import { AppResponse } from '@utils/AppResponse'
import { jwtSign } from '@utils/jwt'
import dotenv from 'dotenv'
import { type Response } from 'express'

dotenv.config()

export interface VkAuthRequest extends UserRequest {
  body: {
    token: string
    uuid: string
  }
}

export const GetVkUserDataController = async (
  req: VkAuthRequest,
  res: Response
) => {
  const {
    uuid,
    token,
  } = req.body

  const response = await vk.getAccessTokenQuery(token, uuid)

  if (!response) {
    return AppResponse.error(res, 'Произошла непредвиденная ошибка')
  }

  const searchUserEmail = await isExistUserEmail(response?.email)

  if (!searchUserEmail) {
    const {
      user_id,
      access_token,
    } = response

    const vkUser = await vk.getVkUserData(access_token, user_id)

    if (!vkUser) {
      return AppResponse.error(res, 'Произошла непредвиденная ошибка')
    }

    const {
      avatar,
      surname,
      name,
      username,
    } = vkUser

    const userId = await createUserVk({
      email: response.email,
      name,
      surname,
      username,
      avatar,
    })

    const user = await getUserId(userId)
    const userToken = jwtSign({ id: user.id })

    return new AppResponse(res)
      .setStatus(200)
      .setCookie('Authorization', userToken, { maxAge: 3600 * 60 * 60 * 60 })
      .setJson({
        success: {
          auth: true,
          user,
        },
      })
      .execute()
  }

  const user = await getUserEmail(response?.email)
  const userToken = jwtSign({ id: user.id })

  return new AppResponse(res)
    .setStatus(200)
    .setCookie('Authorization', userToken, { maxAge: 3600 * 60 * 60 * 60 })
    .setJson({
      success: {
        auth: true,
        user,
      },
    })
    .execute()
}
