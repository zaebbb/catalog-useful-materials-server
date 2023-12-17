import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllCategoriesSelect = async (): Promise<SelectItems> => {
  const items = await prisma.categories.findMany()

  return items.map((item): SelectItem => ({
    id: item.id,
    code: item.code,
    content: item.name,
  }))
}
