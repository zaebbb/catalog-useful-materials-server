import { PrismaClient } from '@prisma/client'
import { type UserNotesListElement, type UserNotesQueryParams } from '../types/NotesListModel'

const prisma = new PrismaClient()

const ITEMS_COUNT = 10

export const fetchUserNotes = async (
  userId: number,
  options: UserNotesQueryParams
): Promise<UserNotesListElement[]> => {
  const {
    description,
    categoryId,
    viewId,
    tagsIds,
    page,
    typeId,
  } = options

  const pageItems = Number(page)

  const tags = tagsIds ? JSON.parse(tagsIds) as number[] : []

  const notes = await prisma.notes.findMany({
    skip: ITEMS_COUNT * pageItems,
    take: ITEMS_COUNT,
    select: {
      id: true,
      title: true,
      createdAt: true,
      description: true,
      code: true,
      category: {
        select: {
          code: true,
          name: true,
        },
      },
    },
    where: {
      user_id: {
        equals: userId,
      },
      OR: [
        {
          title: {
            contains: description,
          },
        },
        {
          description: {
            contains: description,
          },
        },
      ],
      AND: [
        categoryId ? {
          category_id: {
            equals: Number(categoryId),
          },
        } : {},
        viewId ? {
          view_id: {
            equals: Number(viewId),
          },
        } : {},
        typeId ? {
          type_id: {
            equals: Number(typeId),
          },
        } : {},
        tags.length ? {
          tags: {
            some: {
              AND: [
                {
                  tags: {
                    AND: [
                      {
                        id: {
                          in: tags,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        } : {},
      ],
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
  })

  return notes.map((note): UserNotesListElement => ({
    title: note.title,
    code: note.code,
    category: note.category,
    id: note.id,
    createdAt: note.createdAt,
    description: note.description,
  }))
}
