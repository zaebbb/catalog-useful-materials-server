import { type UploadedFile } from 'express-fileupload'

export interface BaseFields {
  typeId: number
  viewId: number
  userId: number
  categoryId: number
  tagsIds: number[]
  title: string
  description: string
  draft: boolean
}

export interface Fields {
  file: UploadedFile
  files: UploadedFile[]
  text: string
  checkbox: boolean
}
