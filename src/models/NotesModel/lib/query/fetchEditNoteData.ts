import { type UserBaseData } from '@model/UserModel'
import { PrismaClient } from '@prisma/client'

export interface EditNoteDataResult {
  id: number
  code: string
  type: SelectItem
  view: SelectItem
  user: UserBaseData
  category: SelectItem
  tags: SelectItems
  title: string
  description: string
  draft: boolean
  fields: FieldItem[]
}

export interface FieldItem {
  id: number
  code: string
  value: string
  name: string
}

const prisma = new PrismaClient()

export const fetchEditNoteData = async (
  code: string,
  userId: number
): Promise<EditNoteDataResult | undefined> => {
  const note = await prisma.notes.findFirst({
    where: {
      code: {
        equals: code,
      },
      user: {
        id: {
          equals: userId,
        },
      },
    },
    select: {
      id: true,
      code: true,
      title: true,
      description: true,
      active: true,
      type: true,
      view: true,
      user: true,
      category: true,
      tags: {
        select: {
          tags: true,
        },
      },
      fields: {
        select: {
          id: true,
          code: true,
          value: true,
          name: true,
        },
        orderBy: {
          id: 'asc',
        },
      },
    },
  })

  if (note) {
    return {
      title: note.title,
      code: note.code,
      description: note.description,
      draft: !note.active,
      id: note.id,
      type: {
        code: note.type.code,
        id: note.type.id,
        content: note.type.name,
      },
      view: {
        code: note.view.code,
        id: note.view.id,
        content: note.view.name,
      },
      category: {
        code: note.category.code,
        id: note.category.id,
        content: note.category.name,
      },
      user: {
        id: note.user.id,
        username: note.user.username,
        email: note.user.email,
      },
      tags: note.tags.map((tag): SelectItem => ({
        code: tag.tags.code,
        id: tag.tags.id,
        content: tag.tags.name,
      })),
      fields: note.fields.map((field): FieldItem => ({
        id: field.id,
        code: field.code,
        value: field.value,
        name: field.name,
      })),
    }
  }

  return undefined
}
