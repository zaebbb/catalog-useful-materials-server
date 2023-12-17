// const
//
// export const FileMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.files && Array.isArray(req.files)) {
//     const mapperFiles: FileArray = req.files
//       .map((
//         file: UploadedFile | UploadedFile[]
//       ): UploadedFile | UploadedFile[] => {
//         if (Array.isArray(file)) {
//
//         }
//
//         return {
//
//         }
//     })
//
//       req.files.map((file: UploadedFile) => {
//         return {
//           ...file,
//           name: file.name.toLowerCase(),
//         }
//       })
//
//     req.files = mapperFiles
//   }
//
//   next()
// }
