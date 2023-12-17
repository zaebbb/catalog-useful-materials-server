import { LoggerService } from '@service/LoggerService'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const secretKey: string = process.env.APP_JWT_KEY || ''

export const jwtSign = <T extends object>(data: T): string => {
  return jwt.sign(data, secretKey, { algorithm: 'HS256' })
}

export const jwtVerify = <T extends jwt.JwtPayload>(token: string): T | undefined => {
  try {
    return jwt.verify(token, secretKey) as T
  } catch (err) {
    LoggerService('error').error(err)
  }

  return undefined
}
