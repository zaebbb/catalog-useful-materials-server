import { notesViewIdExist } from '@model/NotesViewsModel'

export const isViewNoteExist = async (viewId: number): Promise<boolean> => {
  if (viewId) {
    return true
  }

  return await notesViewIdExist(viewId)
}
