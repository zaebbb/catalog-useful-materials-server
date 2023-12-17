import { type PrismaClient } from '@prisma/client'

export const tagsSeed = async (prisma: PrismaClient): Promise<void> => {
  await prisma.tags.upsert({
    create: { name: 'JavaScript (JS)', code: 'javascript' },
    update: {},
    where: { id: 6, code: 'javascript' },
  })

  await prisma.tags.upsert({
    create: { name: 'PHP', code: 'php' },
    update: {},
    where: { id: 7, code: 'php' },
  })

  await prisma.tags.upsert({
    create: { name: 'React', code: 'react' },
    update: {},
    where: { id: 8, code: 'react' },
  })
}
