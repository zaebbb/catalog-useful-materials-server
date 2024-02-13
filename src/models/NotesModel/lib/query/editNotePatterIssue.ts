import { getFieldId } from '@model/FieldsModel'
import { clearNoteTags } from '@model/NotesModel/lib/query/clearNoteTags'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type IssueTypePattern } from '../types/patterns/IssueTypePattern'

export type IssueTypePatternData = Omit<IssueTypePattern, 'imageIssue'> & {
  imageIssue?: string
}

const prisma = new PrismaClient()

export const editNotePatternIssue = async (noteData: IssueTypePatternData): Promise<string> => {
  const noteId = Number(noteData.id)
  const linkIssueId = await getFieldId(noteId, 'linkIssue')
  const imageIssueId = await getFieldId(noteId, 'imageIssue')

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
              name: 'linkIssue',
              value: noteData.linkIssue ?? '',
            },
            where: {
              id: linkIssueId,
            },
            update: {
              value: noteData.linkIssue,
            },
          },
          {
            create: {
              code: v4(),
              name: 'imageIssue',
              value: noteData.imageIssue ?? '',
            },
            where: {
              id: imageIssueId,
            },
            update: {
              value: noteData.imageIssue,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
