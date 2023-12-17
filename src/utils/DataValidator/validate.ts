import { textReplacer } from '@utils/textReplacer'
import type fileUpload from 'express-fileupload'
import { isArray } from './helpers/isArray'
import { isArrayMinLength } from './helpers/isArrayMinLength'
import { isCategoryExists } from './helpers/isCategoryExists'
import { isEmail } from './helpers/isEmail'
import { isFile } from './helpers/isFile'
import { isFileSize } from './helpers/isFileSize'
import { isImage } from './helpers/isImage'
import { isLink } from './helpers/isLink'
import { isMaxString } from './helpers/isMaxString'
import { isRequired } from './helpers/isRequired'
import { isTagsExists } from './helpers/isTagsExists'
import { isTypeNoteExist } from './helpers/isTypeNoteExist'
import { isViewNoteExist } from './helpers/isViewNoteExist'
import { ErrorsList } from './lib/ErrorsList'
import {
  type ErrorResult,
  type IsFileMax,
  type IsMaxStringProps, type IsMinArrayProps,
} from './lib/types/DataValidator'

interface DataValidatorOptions {
  isRequired?: boolean
  isEmail?: boolean
  isMaxString?: IsMaxStringProps
  isFileSize?: IsFileMax
  isImage?: boolean
  isFile?: boolean
  isLink?: boolean
  isArray?: boolean
  isArrayMinLength?: IsMinArrayProps
  isCategoryExist?: boolean
  isNotesTypesExist?: boolean
  isNotesViewsExist?: boolean
  isTagsExist?: boolean
}

export const validate = async <T>(value: T, options: DataValidatorOptions): Promise<ErrorResult> => {
  if (options.isRequired && !isRequired(value)) {
    return ErrorsList.required
  }

  if (options.isEmail && !isEmail(String(value))) {
    return ErrorsList.email
  }

  if (options.isLink && !isLink(String(value))) {
    return ErrorsList.link
  }

  if (options.isArray && !isArray(value as T[])) {
    return ErrorsList.array
  }

  if (options.isArrayMinLength?.on && !isArrayMinLength(value as T[], options.isArrayMinLength.max)) {
    return textReplacer(ErrorsList.arrayLength, 'MIN', String(options.isArrayMinLength.max))
  }

  if (options.isCategoryExist && !await isCategoryExists(Number(value))) {
    return ErrorsList.category
  }

  if (options.isNotesTypesExist && !await isTypeNoteExist(Number(value))) {
    return ErrorsList.category
  }

  if (options.isNotesViewsExist && !await isViewNoteExist(Number(value))) {
    return ErrorsList.category
  }

  if (options.isTagsExist && !await isTagsExists(value as number[])) {
    return ErrorsList.category
  }

  if (options.isMaxString?.on && !isMaxString(String(value), options.isMaxString.max)) {
    return textReplacer(ErrorsList.max, 'MAX', String(options.isMaxString.max))
  }

  if (options.isFile && isFile(value as fileUpload.UploadedFile)) {
    if (options.isImage && !isImage(value as fileUpload.UploadedFile)) {
      return ErrorsList.image
    }

    if (
      options.isFileSize?.on &&
      !isFileSize(
        value as fileUpload.UploadedFile,
        options.isFileSize.maxMB
      )
    ) {
      return textReplacer(ErrorsList.fileSize, 'MAX', String(options.isFileSize.maxMB))
    }
  }

  return true
}
