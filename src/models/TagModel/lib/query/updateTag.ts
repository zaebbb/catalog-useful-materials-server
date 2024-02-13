import { type TagEdit } from '@model/TagModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'

const prisma = new PrismaClient()

export const updateTag = async (tag: TagEdit): Promise<boolean> => {
  const item = await prisma.tags.update({
    data: {
      name: tag.name,
      active: !isBoolean(tag.draft),
    },
    where: {
      id: Number(tag.id),
    },
    select: {
      id: true,
    },
  })

  return Boolean(item.id)
}
