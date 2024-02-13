import { getFieldId } from '@model/FieldsModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type VideoTypePattern } from '../types/patterns/VideoTypePattern'
import { clearNoteTags } from './clearNoteTags'

const prisma = new PrismaClient()

export const editNotePatternVideo = async (noteData: VideoTypePattern): Promise<string> => {
  const noteId = Number(noteData.id)
  const linkVideoId = await getFieldId(noteId, 'linkVideo')

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
              name: 'linkVideo',
              value: noteData.linkVideo ?? '',
            },
            where: {
              id: linkVideoId,
            },
            update: {
              value: noteData.linkVideo,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
