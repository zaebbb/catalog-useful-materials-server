export const ACCESS_CODE_USER: string = 'user'
export const ACCESS_CODE_ADMIN: string = 'admin'

export interface AccessModel {
  id: number
  name: string
  code: string
}
