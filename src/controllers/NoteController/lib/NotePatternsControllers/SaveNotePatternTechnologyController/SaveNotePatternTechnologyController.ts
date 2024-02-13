import {
  createNotePatternTechnology, editNotePatterTechnology,
  type TechnologyTypePattern,
} from '@model/NotesModel'
import { FileService } from '@service/FileService'
import { AppResponse } from '@utils/AppResponse'
import { getFile } from '@utils/fileSystem/getFile'
import {
  NoteTechnologyPatternValidator,
} from '@validator/NoteValidator'
import { type Request, type Response } from 'express'

export interface NotePatternTechnologyRequest extends Request {
  body: Omit<TechnologyTypePattern, 'icon' | 'tagsIds'> & {
    tagsIds: string
  }
}

export const SaveNotePatternTechnologyController = async (
  req: NotePatternTechnologyRequest,
  res: Response
) => {
  const noteData = req.body
  const tagsIds = JSON.parse(noteData.tagsIds)
  const files = req.files
  const icon = getFile(files?.icon)

  const validator: NoteTechnologyPatternValidator = new NoteTechnologyPatternValidator({
    ...noteData,
    tagsIds,
    icon,
  })

  if (await validator.apply()) {
    return AppResponse.validation(res, validator.getErrors())
  }

  let filename = ''

  if (icon) {
    const fileService = new FileService(icon)
    await fileService.save()
    filename = fileService.getFilePath
  }

  let noteCode: string = ''

  if (req.body.mode === 'create') {
    noteCode = await createNotePatternTechnology({
      ...noteData,
      tagsIds,
      icon: filename,
    })
  } else if (req.body.mode === 'edit') {
    noteCode = await editNotePatterTechnology({
      ...noteData,
      tagsIds,
      icon: filename,
    })
  }

  if (!noteCode) {
    return AppResponse.error(res, 'Произошла ошибка при создании заметки')
  }

  return AppResponse.success(res, {
    code: noteCode,
  })
}
