export interface VkAuthResponse {
  response: {
    access_token: string
    access_token_id: string
    user_id: number
    additional_signup_required: boolean
    is_partial: boolean
    is_service: boolean
    source: number
    source_description: string
    email: string
    expires_in: number
  }
}

export interface VkAuthResult {
  access_token: string
  email: string
  user_id: number
}
