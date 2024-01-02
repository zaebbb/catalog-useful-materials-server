import { PrismaClient } from '@prisma/client'
import { type UserNotesListElement } from '../types/NotesListModel'

const prisma = new PrismaClient()

export const fetchUserNotes = async (userId: number): Promise<UserNotesListElement[]> => {
  const notes = await prisma.notes.findMany({
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
