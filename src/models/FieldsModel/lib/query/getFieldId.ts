import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getFieldId = async (
  noteId: number,
  name: string
): Promise<number> => {
  const item = await prisma.fields.findFirst({
    select: {
      id: true,
    },
    where: {
      note_id: noteId,
      name: {
        equals: name,
      },
    },
  })

  if (item) {
    return item.id
  }

  return 0
}
