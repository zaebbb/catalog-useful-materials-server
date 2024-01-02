import { PrismaClient } from '@prisma/client'
import { GetFileService } from '@service/FileService'
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
      userData: {
        select: {
          avatar: true,
        },
      },
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

  const avatarFile = new GetFileService(user?.userData?.avatar)

  const userData: UserData = {
    id: Number(user?.id),
    email: user?.email ?? '',
    username: user?.username ?? '',
    avatar: user?.userData?.avatar ? avatarFile.getPath() : '',
    accesses,
  }

  return userData
}
