import { getFieldId } from '@model/FieldsModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type TechnologyTypePattern } from '../types/patterns/TechnologyTypePattern'
import { clearNoteTags } from './clearNoteTags'

export type TechnologyTypePatternData = Omit<TechnologyTypePattern, 'icon'> & {
  icon?: string
}

const prisma = new PrismaClient()

export const editNotePatterTechnology = async (noteData: TechnologyTypePatternData): Promise<string> => {
  const noteId = Number(noteData.id)
  const linkTechnologyId = await getFieldId(noteId, 'linkTechnology')
  const linkInstallId = await getFieldId(noteId, 'linkInstall')
  const linkDocsId = await getFieldId(noteId, 'linkDocs')
  const iconId = await getFieldId(noteId, 'icon')

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
              name: 'linkTechnology',
              value: noteData.linkTechnology ?? '',
            },
            where: {
              id: linkTechnologyId,
            },
            update: {
              value: noteData.linkTechnology,
            },
          },
          {
            create: {
              code: v4(),
              name: 'linkDocs',
              value: noteData.linkDocs ?? '',
            },
            where: {
              id: linkDocsId,
            },
            update: {
              value: noteData.linkDocs,
            },
          },
          {
            create: {
              code: v4(),
              name: 'linkInstall',
              value: noteData.linkInstall ?? '',
            },
            where: {
              id: linkInstallId,
            },
            update: {
              value: noteData.linkInstall,
            },
          },
          {
            create: {
              code: v4(),
              name: 'icon',
              value: noteData.icon ?? '',
            },
            where: {
              id: iconId,
            },
            update: {
              value: noteData.icon,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
