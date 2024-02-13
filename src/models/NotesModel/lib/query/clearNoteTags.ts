import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const clearNoteTags = async (
  tagsIds: number[],
  noteId: number
): Promise<void> => {
  for (const tagId of tagsIds) {
    await prisma.noteTag.deleteMany({
      where: {
        note_id: {
          equals: noteId,
        },
        tag_id: {
          equals: tagId,
        },
      },
    })
  }
}
