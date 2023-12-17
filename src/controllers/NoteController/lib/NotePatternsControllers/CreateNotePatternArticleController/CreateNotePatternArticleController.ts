import { type ArticleTypePattern, createNotePatternArticle } from '@model/NotesModel'
import { FileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { getFile } from '@utils/fileSystem/getFile'
import { NoteArticlePatternValidator } from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface CreateNotePatternArticleRequest extends Request {
  body: Omit<ArticleTypePattern, 'image' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const CreateNotePatternArticleController = async (
  req: CreateNotePatternArticleRequest,
  res: Response
) => {
  const noteData = req.body
  const files = req.files
  const image = getFile(files?.image)
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteArticlePatternValidator = new NoteArticlePatternValidator({
    ...noteData,
    tagsIds,
    image,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let filename = ''

  if (image) {
    const fileService = new FileService(image)
    await fileService.save()
    filename = fileService.getFilePath
  }

  const noteCode = await createNotePatternArticle({
    ...noteData,
    tagsIds,
    image: filename,
  })

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
