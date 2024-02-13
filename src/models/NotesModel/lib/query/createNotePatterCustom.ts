import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { v4 } from 'uuid'
import { savingCustomFiles } from '../helpers/savingCustomFiles'
import { CustomFieldCodeList, type CustomTypePatternData } from '../types/patterns/CustomTypePattern'

const prisma = new PrismaClient()

export const createNotePatternCustom = async (noteData: CustomTypePatternData): Promise<string> => {
  const code = v4()

  const savingFiles = await savingCustomFiles(
    noteData.stringFields,
    noteData.files
  )

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
        create: noteData.stringFields.map(field => {
          if (
            field.code === CustomFieldCodeList.FILE ||
            field.code === CustomFieldCodeList.FILE_GROUP
          ) {
            return {
              name: field.name,
              value: savingFiles[field.name] ?? '',
              code: field.code,
            }
          }

          return {
            name: field.name,
            value: field.value ?? '',
            code: field.code,
          }
        }),
      },
    },
  })

  return code
}
