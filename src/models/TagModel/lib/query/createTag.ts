import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { type TagCreated } from '../types/TagModel'

const prisma = new PrismaClient()

export const createTag = async (tag: TagCreated): Promise<boolean> => {
  const item = await prisma.tags.create({
    data: {
      code: tag.code,
      name: tag.name,
      active: !isBoolean(tag.draft),
    },
  })

  return !!item
}
