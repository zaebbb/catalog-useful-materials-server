import { type CategoryEdit } from '@model/CategoryModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'

const prisma = new PrismaClient()

export const updateCategory = async (category: CategoryEdit): Promise<boolean> => {
  const item = await prisma.categories.update({
    data: {
      name: category.name,
      active: !isBoolean(category.draft),
    },
    where: {
      id: Number(category.id),
    },
    select: {
      id: true,
    },
  })

  return Boolean(item.id)
}
