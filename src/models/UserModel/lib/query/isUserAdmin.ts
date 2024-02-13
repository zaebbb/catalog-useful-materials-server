import { ACCESS_CODE_ADMIN } from '@model/AccessModel'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const isUserAdmin = async (id: number): Promise<boolean> => {
  const user = await prisma.users.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
    select: {
      id: true,
    },
  })

  const access = await prisma.userAccess.findFirst({
    select: {
      id: true,
    },
    where: {
      user_id: user?.id,
      access: {
        code: {
          equals: ACCESS_CODE_ADMIN,
        },
      },
    },
  })

  return !!access
}
