import * as nodePath from 'path'
import { getApiUrl } from '@utils/getApiUrl'
import { getDomain } from '@utils/getDomain'

export interface GetDirUpload {
  src: string
  path: string
}

export const getDirUpload = (paths: string[] = []): GetDirUpload => {
  const host = getDomain()
  const api = getApiUrl()

  if (paths.length) {
    return {
      path: nodePath.resolve(__dirname, '..', '..', '..', '..', 'upload', ...paths),
      src: `${host}${api}/upload/${paths.join('/')}`,
    }
  }

  return {
    path: nodePath.resolve(__dirname, '..', '..', '..', '..', 'upload'),
    src: '',
  }
}
