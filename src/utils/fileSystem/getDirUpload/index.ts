import * as nodePath from 'path'
import { getDomain } from '@utils/getDomain'

export interface GetDirUpload {
  src: string
  path: string
}

export const getDirUpload = (paths: string[] = []): GetDirUpload => {
  const host = getDomain()

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
