import fs from 'fs'
import { LoggerService } from '@service/LoggerService'
import { generateFilePath } from '@utils/fileSystem/generateFilePath'
import { type UploadedFile } from 'express-fileupload'

export class FileService {
  private readonly file: UploadedFile
  private readonly fullPath: string
  private readonly filePath: string
  private readonly hashPath: string
  constructor (file: UploadedFile) {
    this.file = file

    const {
      filePath,
      full,
      hashPath,
    } = generateFilePath(file)

    this.fullPath = full
    this.filePath = filePath
    this.hashPath = hashPath
  }

  get getFilePath (): string {
    return this.filePath
  }

  async save (): Promise<boolean> {
    try {
      await fs.promises.mkdir(this.hashPath, { recursive: true })

      this.file.mv(this.fullPath, (err) => {
        if (err) {
          LoggerService('error').error(err)
        }
      })

      return true
    } catch (e) {
      LoggerService('error').error(e)
    }

    return false
  }
}
