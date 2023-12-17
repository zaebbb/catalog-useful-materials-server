import { type UploadedFile } from 'express-fileupload'
import type fileUpload from 'express-fileupload'

export const getFile = (
  file: UploadedFile | UploadedFile[] | undefined
): fileUpload.UploadedFile | undefined => {
  if (!file) {
    return undefined
  }

  if (Array.isArray(file)) {
    return file[0]
  }

  return file
}
