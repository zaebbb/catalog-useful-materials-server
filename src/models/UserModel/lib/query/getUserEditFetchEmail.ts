import { ACCESS_CODE_ADMIN, ACCESS_CODE_USER } from '@model/AccessModel'
import { PrismaClient } from '@prisma/client'
import { type UserEditData } from '../types/UserModel'

const prisma = new PrismaClient()

export const getUserEditFetchEmail = async (email: string): Promise<UserEditData> => {
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
    select: {
      id: true,
      email: true,
      username: true,
      accesses: {
        select: {
          access: {
            select: {
              code: true,
              name: true,
            },
          },
        },
      },
    },
  })

  return {
    id: Number(user?.id),
    email: user?.email ?? '',
    username: user?.username ?? '',
    isAdmin: user?.accesses.some(({ access }) => {
      const { code } = access

      return code === ACCESS_CODE_ADMIN
    }) ?? false,
    isUser: user?.accesses.some(({ access }) => {
      const { code } = access

      return code === ACCESS_CODE_USER
    }) ?? false,
  }
}
