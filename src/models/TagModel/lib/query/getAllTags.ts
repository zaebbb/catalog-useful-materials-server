import { PrismaClient } from '@prisma/client'
import { type TagElement } from '../types/TagModel'

const prisma = new PrismaClient()

export const getAllTags = async (): Promise<TagElement[]> => {
  const items = await prisma.tags.findMany({
    orderBy: {
      id: 'desc',
    },
  })

  return items.map((item): TagElement => ({
    id: item.id,
    code: item.code,
    createdAt: item.createdAt,
    name: item.name,
  }))
}
