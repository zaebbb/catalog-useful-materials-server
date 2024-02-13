import { ACCESS_CODE_ADMIN, ACCESS_CODE_USER, getAccess } from '@model/AccessModel'
import { getUserAccess } from '@model/UserAccess'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { type UserEditData } from '../types/UserModel'

const prisma = new PrismaClient()

// Добавить userAccess модель

export const saveUserEdit = async (data: UserEditData): Promise<boolean> => {
  const adminAccess = await getAccess(ACCESS_CODE_ADMIN)
  const userAccess = await getAccess(ACCESS_CODE_USER)
  const userId = Number(data.id)

  if (!adminAccess || !userAccess) {
    return false
  }

  if (isBoolean(data.isAdmin)) {
    const userAccessTable = await getUserAccess(userId, adminAccess.id)

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        accesses: {
          upsert: {
            update: {},
            where: {
              id: userAccessTable.id,
            },
            create: {
              access_id: adminAccess.id,
            },
          },
        },
      },
    })
  } else {
    const userAccessTable = await getUserAccess(userId, adminAccess.id)
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        accesses: {
          delete: {
            id: userAccessTable.id,
          },
        },
      },
    })
  }

  return true
}
