import { getFileExtension } from '@utils/getFileExtension'
import type fileUpload from 'express-fileupload'

const extensionList: string[] = [
  'pdf', 'doc', 'docx',
]

export const isDocument = (file: fileUpload.UploadedFile): boolean => {
  if (!file) {
    return true
  }

  return extensionList.includes(getFileExtension(file) ?? '')
}
