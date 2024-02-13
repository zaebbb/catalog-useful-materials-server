import { PrismaClient } from '@prisma/client'
import { isBoolean } from '@utils/isBoolean'
import { type NoteTypeFieldItem } from '../types/CustomFieldModel'

const prisma = new PrismaClient()

export const createCustomFields = async (
  fields: NoteTypeFieldItem[],
  noteTypeId: number
): Promise<void> => {
  fields.map(async (field) => {
    await prisma.customNoteFieldsTypes.create({
      data: {
        title: field.title,
        custom_note_field_id: Number(field.fieldId),
        isRequired: isBoolean(field.required),
        active: !isBoolean(field.draft),
        custom_note_type_id: noteTypeId,
      },
    })
  })
}
