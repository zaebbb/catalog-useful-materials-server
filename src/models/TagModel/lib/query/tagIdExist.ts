import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tagIdExist = async (id: number): Promise<boolean> => {
  const item = await prisma.tags.findFirst({
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
