import path from 'path'
import { type Request, type Response } from 'express'

export const UploadDownloadController = async (
  req: Request,
  res: Response
) => {
  const filename = req.query.filename
  const pathFile = path.resolve(
    __dirname, '..', '..', '..', '..', 'upload', String(filename)
  )

  res.download(pathFile)
}
