import { customFieldIdExist } from '@model/CustomFieldModel'

export const isCustomFieldExists = async (customFieldId: number): Promise<boolean> => {
  if (!customFieldId) {
    return true
  }

  return await customFieldIdExist(customFieldId)
}
