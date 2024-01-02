import { createUser, type UserRegisterValues } from '@model/UserModel'
import { getUserId } from '@model/UserModel/lib/query/getUserId'
import { AppResponse } from '@utils/AppResponse'
import { jwtSign } from '@utils/jwt'
import { RegisterValidator } from '@validator/UserValidator'
import { type Request, type Response } from 'express'

export const RegisterController = async (
  req: Request<any, any, UserRegisterValues>,
  res: Response
) => {
  const registerData = req.body

  const validator: RegisterValidator = new RegisterValidator(registerData)

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  const createdUserId = await createUser(registerData)

  const user = await getUserId(createdUserId)
  const token = jwtSign({ id: user.id })

  return new AppResponse(res)
    .setStatus(200)
    .setCookie('Authorization', token, { maxAge: 3600 * 60 * 60 * 60 })
    .setJson({ success: user })
    .execute()
}
