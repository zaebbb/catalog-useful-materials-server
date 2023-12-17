import { formatFileSize } from '@utils/fileSystem/formatFileSize'
import type fileUpload from 'express-fileupload'

export const isFileSize = (file: fileUpload.UploadedFile, size: number): boolean => {
  return formatFileSize(size, 'MB') > file.size
}
