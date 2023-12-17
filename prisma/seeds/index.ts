import { PrismaClient } from '@prisma/client'
import { accessSeed } from './accessSeed'
import { categorySeed } from './categorySeed'
import { customFields } from './customFieldsSeed'
import { notesTypes } from './notesTypesSeed'
import { notesView } from './notesViewSeed'
import { tagsSeed } from './tagsSeed'
import { userSeed } from './userSeed'

const prisma = new PrismaClient()

const seeds: Array<(prisma: PrismaClient) => Promise<void>> = [
  accessSeed,
  userSeed,
  notesTypes,
  notesView,
  customFields,
  tagsSeed,
  categorySeed,
]

function runSeeds (): void {
  seeds.forEach(seed => {
    seed(prisma)
      .then(async () => {
        await prisma.$disconnect()
      })
      .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
      })
  })
}

runSeeds()

console.log('База успешно заполнена')
