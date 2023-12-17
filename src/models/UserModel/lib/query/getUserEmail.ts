import { PrismaClient } from '@prisma/client'
import { type Access, type UserData } from '../types/UserModel'

const prisma = new PrismaClient()

export const getUserEmail = async (email: string): Promise<UserData> => {
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

  const accesses: Access[] = []

  user?.accesses.forEach(accessItem => {
    const {
      access,
    } = accessItem

    accesses.push({
      code: access.code,
      name: access.name,
    })
  })

  const userData: UserData = {
    id: Number(user?.id),
    email: user?.email ?? '',
    username: user?.username ?? '',
    accesses,
  }

  return userData
}
