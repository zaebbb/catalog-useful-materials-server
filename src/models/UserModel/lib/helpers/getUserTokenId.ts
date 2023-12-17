import { jwtVerify } from '@utils/jwt'
import { type Request } from 'express'
import { type JwtVerifyUserData } from '../types/User'

export const getUserTokenId = <T extends Request>(req: T): undefined | number => {
  const { Authorization: token } = req.cookies

  if (!token) {
    return undefined
  }

  const jwtData: JwtVerifyUserData | undefined = jwtVerify(token)

  if (!jwtData) {
    return undefined
  }

  return jwtData.id
}
