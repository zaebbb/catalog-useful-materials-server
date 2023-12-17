import { type Tag } from '@model/TagModel'
import { PrismaClient } from '@prisma/client'
import { GetFileService } from '@service/FileService'
import { isEmptyObject } from '@utils/isEmptyObject'
import { mapperArticlePattern } from '../helpers/mapperArticlePattern'
import { mapperCodePattern } from '../helpers/mapperCodePattern'
import { type BaseFieldsDetails } from '../types/NotedDetailsModel'

const prisma = new PrismaClient()

export const fetchNoteData = async (code: string): Promise<BaseFieldsDetails | undefined> => {
  const note = await prisma.notes.findFirst({
    select: {
      title: true,
      description: true,
      active: true,
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

  const avatarFile = new GetFileService(note.user.userData?.avatar)

  return {
    title: note.title ?? '',
    description: note.description,
    draft: !note.active,
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
    patternArticle: !isEmptyObject(patternArticle) ? patternArticle : undefined,
    patternCode: !isEmptyObject(patternCode) ? patternCode : undefined,
  }
}
