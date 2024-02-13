import { tagExist, type TagMode } from '@model/TagModel'

export const isTagExist = async (
  value: string,
  mode: TagMode,
  findId?: number
): Promise<boolean> => {
  if (!value) {
    return true
  }

  return await tagExist(value, mode, findId)
}
