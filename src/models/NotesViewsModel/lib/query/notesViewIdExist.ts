import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const notesViewIdExist = async (id: number): Promise<boolean> => {
  const item = await prisma.notesViews.findFirst({
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
