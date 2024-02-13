import { createCustomFields } from '@model/CustomFieldModel'
import { type CreateNoteType } from '@model/NotesTypesModel'
import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'

const prisma = new PrismaClient()

export const createNoteType = async (noteTypeData: CreateNoteType): Promise<boolean> => {
  const noteType = await prisma.notesTypes.create({
    data: {
      code: noteTypeData.code,
      name: noteTypeData.name,
      active: !isBoolean(noteTypeData.draft),
      isCustom: true,

    },
  })

  if (!noteType) {
    return false
  }

  await createCustomFields(noteTypeData.fields, noteType.id)

  return true
}
