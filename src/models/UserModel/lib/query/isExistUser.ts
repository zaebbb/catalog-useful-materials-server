import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const isExistUser = async (id: number): Promise<boolean> => {
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

  return !!user
}
