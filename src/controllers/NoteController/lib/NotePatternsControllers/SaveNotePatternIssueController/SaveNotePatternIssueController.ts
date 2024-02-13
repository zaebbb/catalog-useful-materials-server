import { createNotePatternIssue, editNotePatternIssue, type IssueTypePattern } from '@model/NotesModel'
import { FileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { getFile } from '@utils/fileSystem/getFile'
import { isBoolean } from '@utils/isBoolean'
import { NoteIssuePatternValidator } from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternIssueRequest extends Request {
  body: Omit<IssueTypePattern, 'image' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternIssueController = async (
  req: NotePatternIssueRequest,
  res: Response
) => {
  const noteData = req.body
  const files = req.files
  const image = getFile(files?.imageIssue)
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteIssuePatternValidator = new NoteIssuePatternValidator({
    ...noteData,
    tagsIds,
    imageIssue: image,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let filename = ''

  if (isBoolean(noteData.isImageView) && image) {
    const fileService = new FileService(image)
    await fileService.save()
    filename = fileService.getFilePath
  }

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternIssue({
      ...noteData,
      tagsIds,
      imageIssue: filename,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatternIssue({
      ...noteData,
      tagsIds,
      imageIssue: filename,
    })
  }

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
