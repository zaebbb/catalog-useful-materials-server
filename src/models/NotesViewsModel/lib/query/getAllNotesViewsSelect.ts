import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllNotesViewsSelect = async (): Promise<SelectItems> => {
  const items = await prisma.notesViews.findMany()

  return items.map((item): SelectItem => ({
    id: item.id,
    code: item.code,
    content: item.name,
  }))
}
