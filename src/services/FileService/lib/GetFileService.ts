import { getDirUpload } from '@utils/fileSystem/getDirUpload'

export class GetFileService {
  private readonly file: string

  constructor (file: string | undefined | null = '') {
    this.file = file ?? ''
  }

  getPath (): string {
    if (!this.file) {
      return ''
    }

    if (this.isLink()) {
      return this.file
    }

    return getDirUpload([this.file]).src
  }

  isLink (): boolean {
    const filePath = this.file

    return filePath.startsWith('http://') || filePath.startsWith('https://')
  }
}
