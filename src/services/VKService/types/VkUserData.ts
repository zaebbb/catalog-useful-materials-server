export interface VkUser {
  id: number
  first_name: string
  last_name: string
  deactivated: string
  is_closed: boolean
  can_access_closed: boolean

  // optional
  bdate?: string
  photo_400_orig?: string
  screen_name?: string
}

export interface GetVkUsersResponse {
  response: VkUser[]
}

export interface GetVkUsersRequest {
  user_ids: string
  fields: string
  access_token: string
  v: number
}

export interface GetUserVkDataResult {
  name: string
  surname: string
  avatar: string
  username: string
}
