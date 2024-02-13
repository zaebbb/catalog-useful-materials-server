import { type BookTypePattern, createNotePatternBook, editNotePatternBook } from '@model/NotesModel'
import { FileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { getFile } from '@utils/fileSystem/getFile'
import { isBoolean } from '@utils/isBoolean'
import { NoteBookPatternValidator } from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternBookRequest extends Request {
  body: Omit<BookTypePattern, 'fileBook' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternBookController = async (
  req: NotePatternBookRequest,
  res: Response
) => {
  const noteData = req.body
  const files = req.files
  const file = getFile(files?.fileBook)
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteBookPatternValidator = new NoteBookPatternValidator({
    ...noteData,
    tagsIds,
    fileBook: file,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let filename = ''

  if (isBoolean(noteData.isFileView) && file) {
    const fileService = new FileService(file)
    await fileService.save()
    filename = fileService.getFilePath
  }

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternBook({
      ...noteData,
      tagsIds,
      fileBook: filename,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternBook({
      ...noteData,
      tagsIds,
      fileBook: filename,
    })
  }

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
