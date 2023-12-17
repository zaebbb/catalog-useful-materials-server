import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const categoryIdExist = async (id: number): Promise<boolean> => {
  const item = await prisma.categories.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
    select: {
      id: true,
    },
  })

  return !!item
}
