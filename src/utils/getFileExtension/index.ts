import type fileUpload from 'express-fileupload'

export const getFileExtension = (file: fileUpload.UploadedFile): string | undefined => {
  const fileName = file.name.toLowerCase()

  const fileNameArr = fileName.split('.')

  if (fileNameArr.length < 2) {
    return undefined
  }

  return fileNameArr[fileNameArr.length - 1]
}
