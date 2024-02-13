import { PrismaClient } from '@prisma/client'
import { type CategoryElement } from '../types/CategoriesModel'

const prisma = new PrismaClient()

export const getAllCategories = async (): Promise<CategoryElement[]> => {
  const items = await prisma.categories.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  return items.map((item): CategoryElement => ({
    id: item.id,
    code: item.code,
    createdAt: item.createdAt,
    name: item.name,
  }))
}
