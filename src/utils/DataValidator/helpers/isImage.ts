import { getFileExtension } from '@utils/getFileExtension'
import type fileUpload from 'express-fileupload'

const extensionList: string[] = [
  'png', 'jpg', 'jpeg', 'gif', 'svg',
]

export const isImage = (file: fileUpload.UploadedFile): boolean => {
  if (!file) {
    return true
  }

  return extensionList.includes(getFileExtension(file) ?? '')
}
