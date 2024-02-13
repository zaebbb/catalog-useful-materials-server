import { NotesTypesCodeList as TypeList } from '@model/NotesTypesModel'
import { type Tag } from '@model/TagModel'
import { PrismaClient } from '@prisma/client'
import { GetFileService } from '@service/FileService'
import { isPattern } from '../helpers/isPattern'
import { mapperArticlePattern } from '../helpers/mapperArticlePattern'
import { mapperBookPattern } from '../helpers/mapperBookPattern'
import { mapperCodePattern } from '../helpers/mapperCodePattern'
import { mapperCoursePattern } from '../helpers/mapperCoursePattern'
import { mapperCustomPattern } from '../helpers/mapperCustomPattern'
import { mapperIssuePattern } from '../helpers/mapperIssuePattern'
import { mapperLayoutPattern } from '../helpers/mapperLayoutPattern'
import { mapperServicePattern } from '../helpers/mapperServicePattern'
import { mapperTechnologyPattern } from '../helpers/mapperTechnologyPattern'
import { mapperVideoPattern } from '../helpers/mapperVideoPattern'
import { type BaseFieldsDetails } from '../types/NotedDetailsModel'

const prisma = new PrismaClient()

export const fetchNoteData = async (code: string): Promise<BaseFieldsDetails | undefined> => {
  const note = await prisma.notes.findFirst({
    select: {
      title: true,
      description: true,
      active: true,
      createdAt: true,
      category: {
        select: {
          code: true,
          name: true,
        },
      },
      type: {
        select: {
          code: true,
          name: true,
          isCustom: true,
        },
      },
      view: {
        select: {
          code: true,
          name: true,
        },
      },
      tags: {
        select: {
          tags: {
            select: {
              code: true,
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          userData: {
            select: {
              avatar: true,
            },
          },
        },
      },
      fields: {
        select: {
          value: true,
          name: true,
          code: true,
        },
        where: {
          notes: {
            code: {
              equals: code,
            },
          },
        },
      },
    },
    where: {
      code: {
        equals: code,
      },
    },
  })

  if (!note) {
    return undefined
  }

  const tags: Tag[] = note.tags.map(tag => ({
    code: tag.tags.code,
    name: tag.tags.name,
  }))

  const patternArticle = mapperArticlePattern(note.fields)
  const patternCode = mapperCodePattern(note.fields)
  const patternIssue = mapperIssuePattern(note.fields)
  const patternLayout = mapperLayoutPattern(note.fields)
  const patternService = mapperServicePattern(note.fields)
  const patternBook = mapperBookPattern(note.fields)
  const patternVideo = mapperVideoPattern(note.fields)
  const patternTechnology = mapperTechnologyPattern(note.fields)
  const patternCourse = mapperCoursePattern(note.fields)
  const patternCustom = mapperCustomPattern(note.fields)

  const avatarFile = new GetFileService(note.user.userData?.avatar)

  const {
    code: codeNote,
  } = note.type

  return {
    title: note.title ?? '',
    description: note.description,
    draft: !note.active,
    createdAt: note.createdAt,
    category: note.category,
    type: note.type,
    view: note.view,
    tags,
    user: {
      id: note.user.id,
      username: note.user.username,
      email: note.user.email,
      avatar: note.user.userData?.avatar ? avatarFile.getPath() : '',
    },
    patternArticle: isPattern(patternArticle, codeNote, TypeList.ARTICLE) ? patternArticle : undefined,
    patternCode: isPattern(patternCode, codeNote, TypeList.CODE) ? patternCode : undefined,
    patternIssue: isPattern(patternIssue, codeNote, TypeList.ISSUE) ? patternIssue : undefined,
    patternLayout: isPattern(patternLayout, codeNote, TypeList.LAYOUT) ? patternLayout : undefined,
    patternService: isPattern(patternService, codeNote, TypeList.SERVICE) ? patternService : undefined,
    patternBook: isPattern(patternBook, codeNote, TypeList.BOOK) ? patternBook : undefined,
    patternVideo: isPattern(patternVideo, codeNote, TypeList.VIDEO) ? patternVideo : undefined,
    patternTechnology: isPattern(patternTechnology, codeNote, TypeList.TECHNOLOGY) ? patternTechnology : undefined,
    patternCourse: isPattern(patternCourse, codeNote, TypeList.COURSE) ? patternCourse : undefined,
    patternCustom: note.type.isCustom ? patternCustom : undefined,
  }
}
