import { getFieldId } from '@model/FieldsModel'
import { type LayoutTypePattern } from '@model/NotesModel'
import { clearNoteTags } from '@model/NotesModel/lib/query/clearNoteTags'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'

export type LayoutTypePatternData = Omit<LayoutTypePattern, 'imageLayout'> & {
  imageLayout?: string
}

const prisma = new PrismaClient()

export const editNotePatterLayout = async (noteData: LayoutTypePatternData): Promise<string> => {
  const noteId = Number(noteData.id)
  const linkLayoutId = await getFieldId(noteId, 'linkLayout')
  const imageLayoutId = await getFieldId(noteId, 'imageLayout')

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
              name: 'linkLayout',
              value: noteData.linkLayout ?? '',
            },
            where: {
              id: linkLayoutId,
            },
            update: {
              value: noteData.linkLayout,
            },
          },
          {
            create: {
              code: v4(),
              name: 'imageLayout',
              value: noteData.imageLayout ?? '',
            },
            where: {
              id: imageLayoutId,
            },
            update: {
              value: noteData.imageLayout,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
