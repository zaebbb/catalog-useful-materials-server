import type fileUpload from 'express-fileupload'

export const isFile = (file: fileUpload.UploadedFile): boolean => {
  return !!file
}
