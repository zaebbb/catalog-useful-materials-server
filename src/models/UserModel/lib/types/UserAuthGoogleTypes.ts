export interface UserAuthGoogleParams {
  email: string
  family_name: string
  given_name: string
  picture: string
  name: string
}

export type GoogleUpdateMode = 'login' | 'register'

export interface AuthGoogleParams extends UserAuthGoogleParams {
  mode: GoogleUpdateMode
}
