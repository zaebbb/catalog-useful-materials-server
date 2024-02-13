import { getFieldId } from '@model/FieldsModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type BookTypePattern } from '../types/patterns/BookTypePattern'
import { clearNoteTags } from './clearNoteTags'

export type BookTypePatternData = Omit<BookTypePattern, 'fileBook'> & {
  fileBook?: string
}

const prisma = new PrismaClient()

export const editNotePatternBook = async (noteData: BookTypePatternData): Promise<string> => {
  const noteId = Number(noteData.id)
  const fileBookId = await getFieldId(noteId, 'fileBook')
  const linkBookId = await getFieldId(noteId, 'linkBook')

  await clearNoteTags(noteData.tagsIds, noteId)

  const updateItem = await prisma.notes.update({
    select: {
      code: true,
    },
    where: {
      id: noteId,
    },
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
      description: noteData.description,
      active: !isBoolean(noteData.draft),
      fields: {
        upsert: [
          {
            create: {
              code: v4(),
              name: 'linkBook',
              value: noteData.linkBook ?? '',
            },
            where: {
              id: linkBookId,
            },
            update: {
              value: noteData.linkBook,
            },
          },
          {
            create: {
              code: v4(),
              name: 'fileBook',
              value: noteData.fileBook ?? '',
            },
            where: {
              id: fileBookId,
            },
            update: {
              value: noteData.fileBook,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
