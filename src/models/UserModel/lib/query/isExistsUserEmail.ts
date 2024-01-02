import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const isExistUserEmail = async (email: string): Promise<boolean> => {
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
    select: {
      id: true,
    },
  })

  return !!user
}
