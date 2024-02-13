import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tagDelete = async (id: number): Promise<boolean> => {
  const item = await prisma.tags.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  })

  return !!item
}
