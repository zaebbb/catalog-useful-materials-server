import { categoryExist } from '@model/CategoryModel'
import { type TagMode } from '@model/TagModel'

export const isCategoryExist = async (
  value: string,
  mode: TagMode,
  findId?: number
): Promise<boolean> => {
  if (!value) {
    return true
  }

  return await categoryExist(value, mode, findId)
}
