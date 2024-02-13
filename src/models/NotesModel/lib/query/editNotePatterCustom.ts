import { clearNoteTags } from '@model/NotesModel/lib/query/clearNoteTags'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { savingCustomFiles } from '../helpers/savingCustomFiles'
import { CustomFieldCodeList, type CustomTypePatternData } from '../types/patterns/CustomTypePattern'

const prisma = new PrismaClient()

export const editNotePatternCustom = async (noteData: CustomTypePatternData): Promise<string> => {
  const noteId = Number(noteData.id)

  const savingFiles = await savingCustomFiles(
    noteData.stringFields,
    noteData.files
  )

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
        upsert: noteData.stringFields.map(field => {
          if (
            field.code === CustomFieldCodeList.FILE ||
            field.code === CustomFieldCodeList.FILE_GROUP
          ) {
            return {
              create: {
                code: field.code,
                name: field.name,
                value: savingFiles[field.name] ?? '',
              },
              where: {
                id: Number(field.id),
              },
              update: {
                value: savingFiles[field.name] ?? '',
              },
            }
          }

          return {
            create: {
              code: field.code,
              name: field.name,
              value: field.value ?? '',
            },
            where: {
              id: Number(field.id),
            },
            update: {
              value: field.value ?? '',
            },
          }
        }),
      },
    },
  })

  return updateItem.code
}
