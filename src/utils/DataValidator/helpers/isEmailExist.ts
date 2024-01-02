import { isExistUserEmail } from '@model/UserModel/lib/query/isExistsUserEmail'

export const isEmailExist = async (value: string): Promise<boolean> => {
  if (!value) {
    return true
  }

  return await isExistUserEmail(value)
}
