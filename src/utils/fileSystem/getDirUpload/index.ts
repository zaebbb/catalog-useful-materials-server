import * as nodePath from 'path'
import dotenv from 'dotenv'

dotenv.config()

export interface GetDirUpload {
  src: string
  path: string
}

export const getDirUpload = (paths: string[] = []): GetDirUpload => {
  const host = `http://localhost:${process.env.APP_PORT}`

  if (paths.length) {
    return {
      path: nodePath.resolve(__dirname, '..', '..', '..', '..', 'upload', ...paths),
      src: host + '/' + paths.join('/'),
    }
  }

  return {
    path: nodePath.resolve(__dirname, '..', '..', '..', '..', 'upload'),
    src: '',
  }
}
