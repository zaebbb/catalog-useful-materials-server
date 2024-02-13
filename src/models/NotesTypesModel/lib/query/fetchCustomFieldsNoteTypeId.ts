import { PrismaClient } from '@prisma/client'
import { type NotePatternCustomField } from '../types/NotesTypesModel'

const prisma = new PrismaClient()

export const fetchCustomFieldsNoteTypeId = async (
  noteTypeId: number
): Promise<NotePatternCustomField[]> => {
  const noteTypes = await prisma.customNoteFieldsTypes.findMany({
    where: {
      custom_note_type_id: Number(noteTypeId),
      active: true,
    },
    select: {
      title: true,
      isRequired: true,
      noteFields: {
        select: {
          code: true,
        },
      },
    },
  })

  return noteTypes.map((noteType): NotePatternCustomField => ({
    title: noteType.title,
    isRequired: noteType.isRequired,
    code: noteType.noteFields.code,
  }))
}
