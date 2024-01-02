import { type CourseTypePattern } from '@model/NotesModel/lib/types/patterns/CourseTypePattern'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

export const createNotePatternCourse = async (noteData: CourseTypePattern): Promise<string> => {
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
            name: 'linkCourse',
            value: noteData.linkCourse ?? '',
          },
          {
            code: v4(),
            name: 'authorCourse',
            value: noteData.authorCourse ?? '',
          },
        ],
      },
    },
  })

  return code
}
