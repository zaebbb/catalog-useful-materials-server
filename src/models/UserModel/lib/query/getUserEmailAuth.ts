import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserEmailAuth = async (email: string) => {
  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
    select: {
      password: true,
    },
  })

  return user
}
