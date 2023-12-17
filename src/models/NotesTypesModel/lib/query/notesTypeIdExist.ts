import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const notesTypeIdExist = async (id: number): Promise<boolean> => {
  const item = await prisma.notesTypes.findFirst({
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
