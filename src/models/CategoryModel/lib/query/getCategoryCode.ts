import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface GetCategoryCodeResult {
  id: number
  name: string
  draft: boolean
}

export const getCategoryCode = async (code: string): Promise<GetCategoryCodeResult | undefined> => {
  const item = await prisma.categories.findFirst({
    where: {
      code: {
        equals: code,
      },
    },
    select: {
      id: true,
      name: true,
      active: true,
    },
  })

  if (item) {
    return {
      draft: !item.active,
      name: item.name,
      id: item.id,
    }
  }
}
