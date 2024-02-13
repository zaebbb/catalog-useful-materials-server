import { type CategoryMode } from '@model/CategoryModel'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const categoryExist = async (
  param: string,
  mode: CategoryMode,
  findId: number = 0
): Promise<boolean> => {
  const item = await prisma.categories.findFirst({
    where: mode === 'code' ? {
      code: {
        equals: param,
      },
      id: {
        not: Number(findId),
      },
    } : {
      name: {
        equals: param,
      },
      id: {
        not: Number(findId),
      },
    },
    select: {
      id: true,
    },
  })

  return !!item
}
