import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { type CategoryCreated } from '../types/CategoriesModel'

const prisma = new PrismaClient()

export const createCategory = async (tag: CategoryCreated): Promise<boolean> => {
  const item = await prisma.categories.create({
    data: {
      code: tag.code,
      name: tag.name,
      active: !isBoolean(tag.draft),
    },
  })

  return !!item
}
