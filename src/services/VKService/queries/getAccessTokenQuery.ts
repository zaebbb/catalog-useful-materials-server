import axios from 'axios'
import dotenv from 'dotenv'
import {
  type VkAuthResponse, type VkAuthResult,
} from '../types/AccessTokenQuery'

dotenv.config()

export const getAccessTokenQuery = async (
  token: string,
  uuid: string
): Promise<VkAuthResult | null> => {
  const {
    VK_SECRET_KEY,
    VK_API_VERSION,
  } = process.env

  const response = await axios.get<VkAuthResponse>('https://api.vk.com/method/auth.exchangeSilentAuthToken', {
    params: new URLSearchParams({
      v: VK_API_VERSION ?? '',
      token,
      access_token: VK_SECRET_KEY ?? '',
      uuid,
    }),
  })

  if (response.data.response.access_token) {
    const {
      access_token,
      email,
      user_id,
    } = response.data.response

    return {
      access_token,
      email,
      user_id,
    }
  }

  return null
}
