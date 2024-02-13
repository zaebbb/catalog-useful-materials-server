import { PrismaClient } from '@prisma/client'
import { GetFileService } from '@service/FileService'
import { type Access, type UserData } from '../types/UserModel'

const prisma = new PrismaClient()

export const getAllUsers = async (): Promise<UserData[]> => {
  const users = await prisma.users.findMany({
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

  return users.map((user): UserData => {
    const avatar = new GetFileService(user?.userData?.avatar)

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

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user?.userData?.avatar ? avatar.getPath() : '',
      accesses,
    }
  })
}
