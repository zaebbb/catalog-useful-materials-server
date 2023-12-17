import * as NodePath from 'path'
import { type UploadedFile } from 'express-fileupload'
import { v4 } from 'uuid'
import { getDirUpload } from '../getDirUpload'

export interface GenerateFilePathResult {
  full: string
  filePath: string
  hashPath: string
}

export const generateFilePath = (
  file: UploadedFile
): GenerateFilePathResult => {
  const ext = NodePath.extname(file.name)

  const pathHash = v4()
  const filename = v4() + ext

  const filePath: string = `${pathHash}/${filename}`

  const uploadHashPath = getDirUpload([pathHash]).path
  const path = NodePath.resolve(uploadHashPath, filename)

  return {
    full: path,
    filePath,
    hashPath: uploadHashPath,
  }
}
