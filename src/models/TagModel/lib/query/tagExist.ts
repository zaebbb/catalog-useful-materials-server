import { type TagMode } from '@model/TagModel'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const tagExist = async (
  param: string,
  mode: TagMode,
  findId: number = 0
): Promise<boolean> => {
  const item = await prisma.tags.findFirst({
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
