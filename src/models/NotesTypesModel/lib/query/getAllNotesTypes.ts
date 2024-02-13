import { type NotesTypesElement } from '@model/NotesTypesModel/lib/types/NotesTypesModel'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllNotesTypes = async (): Promise<NotesTypesElement[]> => {
  const items = await prisma.notesTypes.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      isCustom: true,
    },
  })

  return items.map((item): NotesTypesElement => ({
    id: item.id,
    code: item.code,
    createdAt: item.createdAt,
    name: item.name,
    isCustom: item.isCustom,
  }))
}
