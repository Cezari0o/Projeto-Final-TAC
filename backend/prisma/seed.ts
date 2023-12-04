import { PrismaClient } from "@prisma/client";
import { countProps } from "../src/repos/dataProcessRepo";

const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.categoryCount.createMany({
      data: countProps.map((val) => ({
        name: val,
      })),
      skipDuplicates: true,
    });
    console.log("DB seeding completed!");
  } catch (err) {
    console.error("DB seed fail:", err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
