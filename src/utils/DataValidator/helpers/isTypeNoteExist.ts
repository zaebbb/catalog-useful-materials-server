import { notesTypeIdExist } from '@model/NotesTypesModel'

export const isTypeNoteExist = async (typeId: number): Promise<boolean> => {
  if (typeId) {
    return true
  }

  return await notesTypeIdExist(typeId)
}
