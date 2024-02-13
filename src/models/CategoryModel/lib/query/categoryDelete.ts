import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const categoryDelete = async (id: number): Promise<boolean> => {
  const item = await prisma.categories.delete({
    where: {
      id,
    },
    select: {
      id: true,
    },
  })

  return !!item
}
