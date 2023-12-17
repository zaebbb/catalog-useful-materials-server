import { type Request } from 'express'
import { type JwtPayload } from 'jsonwebtoken'

export interface JwtVerifyUserData extends JwtPayload {
  id: number
}

interface UserCookies {
  Authorization?: string
}

export interface UserRequest extends Request {
  cookies: UserCookies
}
