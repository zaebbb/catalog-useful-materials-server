import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface GetTagCodeResult {
  id: number
  name: string
  draft: boolean
}

export const getTagCode = async (code: string): Promise<GetTagCodeResult | undefined> => {
  const item = await prisma.tags.findFirst({
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
