import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const teams = await prisma.team.findMany()

  console.log(teams)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
