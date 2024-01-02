import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { type IssueTypePattern } from '../types/patterns/IssueTypePattern'

export type IssueTypePatternData = Omit<IssueTypePattern, 'imageIssue'> & {
  imageIssue?: string
}

const prisma = new PrismaClient()

export const createNotePatternIssue = async (noteData: IssueTypePatternData): Promise<string> => {
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
            name: 'linkIssue',
            value: noteData.linkIssue ?? '',
          },
          {
            code: v4(),
            name: 'imageIssue',
            value: noteData.imageIssue ?? '',
          },
        ],
      },
    },
  })

  return code
}
