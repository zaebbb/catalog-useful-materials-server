import { type UserAuthValues } from '@model/UserModel'
import { getUserEmail } from '@model/UserModel/lib/query/getUserEmail'
import { getUserEmailAuth } from '@model/UserModel/lib/query/getUserEmailAuth'
import { AppResponse } from '@utils/AppResponse'
import { checkHash } from '@utils/hash'
import { jwtSign } from '@utils/jwt'
import { AuthValidator } from '@validator/UserValidator'
import { type Request, type Response } from 'express'

export const AuthController = async (
  req: Request<any, any, UserAuthValues>,
  res: Response
): Promise<Response> => {
  const userData = req.body

  const validator: AuthValidator = new AuthValidator(userData)
  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const {
    email,
    password,
  } = userData

  const userFind = await getUserEmailAuth(email)

  if (userFind && await checkHash(password, userFind.password)) {
    const user = await getUserEmail(email)
    const token = jwtSign({ id: user.id })

    return new AppResponse(res)
      .setStatus(200)
      .setCookie('Authorization', token, { maxAge: 3600 * 60 * 60 * 60 })
      .setJson({ success: user })
      .execute()
  }

  return AppResponse.validation(res, { auth: 'Неверный логин или пароль' })
}
