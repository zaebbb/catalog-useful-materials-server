import { FileService } from '@service/FileService'
import type fileUpload from 'express-fileupload'
import { type UploadedFile } from 'express-fileupload'
import { CustomFieldCodeList, type NotePatternCustomField } from '../types/patterns/CustomTypePattern'

export const savingCustomFiles = async (
  fields: NotePatternCustomField[],
  files: fileUpload.FileArray | null | undefined
): Promise<Record<string, string>> => {
  const savesFiles: Record<string, string> = {}

  for (const field of fields) {
    if (field.code === CustomFieldCodeList.FILE) {
      const fileService = new FileService(
        files?.[field.name] as UploadedFile
      )

      await fileService.save()
      savesFiles[field.name] = fileService.getFilePath
    }

    if (
      field.code === CustomFieldCodeList.FILE_GROUP &&
      files?.[field.name]
    ) {
      if (Array.isArray(files?.[field.name])) {
        const arrFiles = files?.[field.name] as UploadedFile[]
        const filenames: string[] = []

        for (const file of arrFiles) {
          const fileService = new FileService(file)

          await fileService.save()
          const filename = fileService.getFilePath
          filenames.push(filename)
        }

        savesFiles[field.name] = JSON.stringify(filenames)
      }

      if (!Array.isArray(files?.[field.name])) {
        const fileService = new FileService(
          files?.[field.name] as UploadedFile
        )

        await fileService.save()
        const filename = fileService.getFilePath
        savesFiles[field.name] = JSON.stringify([filename])
      }
    }
  }

  return savesFiles
}
