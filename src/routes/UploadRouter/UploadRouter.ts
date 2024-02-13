import {
  UploadController,
  UploadDownloadController,
} from '@controller/UploadController'
import { Router } from 'express'
import {
  UPLOAD_ROUTE_DOWNLOAD,
  UPLOAD_ROUTE_FILE,
} from './UploadRouterList'

export const UploadRouter = (): Router => {
  const router = Router()

  router.post(UPLOAD_ROUTE_FILE, UploadController)
  router.get(UPLOAD_ROUTE_DOWNLOAD, UploadDownloadController)

  return router
}
