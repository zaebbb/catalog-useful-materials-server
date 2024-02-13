import { createNotePatternLayout, editNotePatterLayout, type LayoutTypePattern } from '@model/NotesModel'
import { FileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { getFile } from '@utils/fileSystem/getFile'
import {
  NoteLayoutPatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternLayoutRequest extends Request {
  body: Omit<LayoutTypePattern, 'image' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternLayoutController = async (
  req: NotePatternLayoutRequest,
  res: Response
) => {
  const noteData = req.body
  const files = req.files
  const image = getFile(files?.imageLayout)
  const tagsIds = JSON.parse(noteData.tagsIds)

  const validator: NoteLayoutPatternValidator = new NoteLayoutPatternValidator({
    ...noteData,
    tagsIds,
    imageLayout: image,
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

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternLayout({
      ...noteData,
      tagsIds,
      imageLayout: filename,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatterLayout({
      ...noteData,
      tagsIds,
      imageLayout: filename,
    })
  }

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
