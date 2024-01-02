import { makeFormData } from '@utils/makeFormData'
import axios from 'axios'
import dotenv from 'dotenv'
import {
  type GetUserVkDataResult,
  type GetVkUsersRequest,
  type GetVkUsersResponse,
} from '../types/VkUserData'

dotenv.config()

export const getVkUserData = async (
  token: string,
  userId: number,
  fields: string | undefined = 'screen_name,photo_400_orig'
): Promise<GetUserVkDataResult | null> => {
  const {
    VK_API_VERSION,
  } = process.env

  const response = await axios.post<GetVkUsersResponse>(
    'https://api.vk.com/method/users.get',
    makeFormData<GetVkUsersRequest>({
      data: {
        v: Number(VK_API_VERSION),
        user_ids: String(userId),
        fields,
        access_token: token,
      },
    }))

  if (!response.data?.response.length) {
    return null
  }

  const user = response.data.response[0]

  return {
    surname: user.last_name,
    name: user.first_name,
    username: user.screen_name ?? '',
    avatar: user.photo_400_orig ?? '',
  }
}
