import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type BookTypePattern } from '../types/patterns/BookTypePattern'

export type BookTypePatternData = Omit<BookTypePattern, 'fileBook'> & {
  fileBook?: string
}

const prisma = new PrismaClient()

export const createNotePatternBook = async (noteData: BookTypePatternData): Promise<string> => {
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
            name: 'linkBook',
            value: noteData.linkBook ?? '',
          },
          {
            code: v4(),
            name: 'fileBook',
            value: noteData.fileBook ?? '',
          },
        ],
      },
    },
  })

  return code
}
