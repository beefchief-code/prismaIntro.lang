const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

//step 2
router.get("/", async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (e) {
    next(e);
  }
});

//step 3
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const book = await prisma.book.findUnique({ where: { id: +id } });
    if (book) {
      res.json(book);
    } else {
      next({ status: 404, message: `book with id ${id} does not exist` });
    }
  } catch (e) {
    next(e);
  }
});

//step 5
router.post("/", async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return next({
      status: 400,
      message: "book must have title",
    });
  }
  try {
    const newBook = await prisma.book.create({ data: { title } });
    res.status(201).json(newBook);
  } catch (e) {
    next(e);
  }
});
