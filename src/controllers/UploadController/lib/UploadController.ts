import fs from 'fs/promises'
import { GetFileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { type Request, type Response } from 'express'
import mime from 'mime-types'

export interface UploadControllerRequestBody {
  filename: string
}

export const UploadController = async (
  req: Request<any, any, UploadControllerRequestBody>,
  res: Response
) => {
  const data = req.body

  const file = new GetFileService(data.filename)
  const path = file.getPathOS()

  const type = mime.lookup(path)
  const content: Buffer = await fs.readFile(path)

  if (content && type) {
    return new AppResponse(res)
      .setStatus(200)
      .setHeader('content-type', type)
      .setBlob(content)
      .execute()
  }

  return AppResponse.notFound(res, 'Файл не найден')
}
