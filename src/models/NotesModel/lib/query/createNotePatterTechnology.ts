import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type TechnologyTypePattern } from '../types/patterns/TechnologyTypePattern'

export type TechnologyTypePatternData = Omit<TechnologyTypePattern, 'icon'> & {
  icon?: string
}

const prisma = new PrismaClient()

export const createNotePatternTechnology = async (noteData: TechnologyTypePatternData): Promise<string> => {
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
            name: 'linkTechnology',
            value: noteData.linkTechnology,
          },
          {
            code: v4(),
            name: 'linkDocs',
            value: noteData.linkDocs ?? '',
          },
          {
            code: v4(),
            name: 'linkInstall',
            value: noteData.linkInstall ?? '',
          },
          {
            code: v4(),
            name: 'icon',
            value: noteData.icon ?? '',
          },
        ],
      },
    },
  })

  return code
}
