const prisma = require("../prisma");
const seed = async () => {
  const books = [];
  for (let i = 1; i < 11; i++) {
    books.push({ title: `Book ${i}` });
  }
  await prisma.book.createMany({ data: books });
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
