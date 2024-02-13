import { getFieldId } from '@model/FieldsModel'
import { type CourseTypePattern } from '@model/NotesModel/lib/types/patterns/CourseTypePattern'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { clearNoteTags } from './clearNoteTags'

const prisma = new PrismaClient()

export const editNotePatternCourse = async (noteData: CourseTypePattern): Promise<string> => {
  const noteId = Number(noteData.id)
  const linkCourseId = await getFieldId(noteId, 'linkCourse')
  const authorCourseId = await getFieldId(noteId, 'authorCourse')

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
              name: 'linkCourse',
              value: noteData.linkCourse ?? '',
            },
            where: {
              id: linkCourseId,
            },
            update: {
              value: noteData.linkCourse,
            },
          },
          {
            create: {
              code: v4(),
              name: 'authorCourse',
              value: noteData.authorCourse ?? '',
            },
            where: {
              id: authorCourseId,
            },
            update: {
              value: noteData.authorCourse,
            },
          },
        ],
      },
    },
  })

  return updateItem.code
}
