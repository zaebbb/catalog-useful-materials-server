import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type ArticleTypePattern } from '../types/patterns/ArticleTypePattern'

export type ArticleTypePatternData = Omit<ArticleTypePattern, 'image'> & {
  image?: string
}

const prisma = new PrismaClient()

export const createNotePatternArticle = async (noteData: ArticleTypePatternData): Promise<string> => {
  const code = v4()

  await prisma.notes.create({
    data: {
      user: { connect: { id: Number(noteData.userId) } },
      type: { connect: { id: Number(noteData.typeId) } },
      view: { connect: { id: Number(noteData.viewId) } },
      category: { connect: { id: Number(noteData.categoryId) } },
      tags: {
        create: noteData.tagsIds.map((tagId) => ({
          tag_id: Number(tagId),
        })),
      },
      title: noteData.title,
      code,
      description: noteData.description,
      active: !isBoolean(noteData.draft),
      fields: {
        create: [
          {
            code: v4(),
            name: 'linkNote',
            value: noteData.linkNote,
          },
          {
            code: v4(),
            name: 'linkVideo',
            value: noteData.linkVideo ?? '',
          },
          {
            code: v4(),
            name: 'image',
            value: noteData.image ?? '',
          },
        ],
      },
    },
  })

  return code
}
