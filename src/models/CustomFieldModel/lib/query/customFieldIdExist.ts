import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const customFieldIdExist = async (id: number): Promise<boolean> => {
  const item = await prisma.customNoteFields.findFirst({
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
