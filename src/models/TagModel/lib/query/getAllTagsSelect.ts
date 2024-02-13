import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllTagsSelect = async (): Promise<SelectItems> => {
  const items = await prisma.tags.findMany({
    where: {
      active: true,
    },
  })

  return items.map((item): SelectItem => ({
    id: item.id,
    code: item.code,
    content: item.name,
  }))
}
