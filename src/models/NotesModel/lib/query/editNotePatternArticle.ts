import { getFieldId } from '@model/FieldsModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type ArticleTypePattern } from '../types/patterns/ArticleTypePattern'
import { clearNoteTags } from './clearNoteTags'

export type ArticleTypePatternData = Omit<ArticleTypePattern, 'image'> & {
  image?: string
}

const prisma = new PrismaClient()

export const editNotePatternArticle = async (noteData: ArticleTypePatternData): Promise<string> => {
  const noteId = Number(noteData.id)
  const linkNoteId = await getFieldId(noteId, 'linkNote')
  const linkVideoId = await getFieldId(noteId, 'linkVideo')
  const imageId = await getFieldId(noteId, 'image')

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
              name: 'linkNote',
              value: noteData.linkNote,
            },
            where: {
              id: linkNoteId,
            },
            update: {
              value: noteData.linkNote,
            },
          },
          {
            create: {
              code: v4(),
              name: 'linkVideo',
              value: noteData.linkVideo ?? '',
            },
            update: {
              value: noteData.linkVideo ?? '',
            },
            where: {
              id: linkVideoId,
            },
          },
          {
            create: {
              code: v4(),
              name: 'image',
              value: noteData.image ?? '',
            },
            update: {
              value: noteData.image ?? '',
            },
            where: {
              id: imageId,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
