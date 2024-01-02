import { type NotesTypesCodeList } from '@model/NotesTypesModel'
import { isEmptyObject } from '@utils/isEmptyObject'

export const isPattern = <T extends object>(
  objectPattern: T,
  noteType: string,
  type: NotesTypesCodeList
): boolean => {
  if (isEmptyObject(objectPattern)) {
    return false
  }

  if (noteType !== type) {
    return false
  }

  return true
}
