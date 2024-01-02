import { type LayoutTypePattern } from '@model/NotesModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'

export type LayoutTypePatternData = Omit<LayoutTypePattern, 'imageLayout'> & {
  imageLayout?: string
}

const prisma = new PrismaClient()

export const createNotePatternLayout = async (noteData: LayoutTypePatternData): Promise<string> => {
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
            name: 'linkLayout',
            value: noteData.linkLayout ?? '',
          },
          {
            code: v4(),
            name: 'imageLayout',
            value: noteData.imageLayout ?? '',
          },
        ],
      },
    },
  })

  return code
}
