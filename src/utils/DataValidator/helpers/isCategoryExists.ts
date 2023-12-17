import { categoryIdExist } from '@model/CategoryModel'

export const isCategoryExists = async (categoryId: number): Promise<boolean> => {
  if (!categoryId) {
    return true
  }

  return await categoryIdExist(categoryId)
}
