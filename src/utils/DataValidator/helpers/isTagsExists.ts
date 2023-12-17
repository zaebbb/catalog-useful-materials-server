import { tagIdExist } from '@model/TagModel'

export const isTagsExists = async (tagsIds: number[]): Promise<boolean> => {
  if (!tagsIds.length) {
    return true
  }

  return Boolean(
    tagsIds
      .filter(async (tagId) => await tagIdExist(Number(tagId)))
      .length
  )
}
