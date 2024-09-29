import express from "express";
import {
  getABook,
  getBooks,
  addBook,
  getBooksWithTerm,
  getBooksInRange,
  getBooksWithTermInRange,
} from "../controllers/bookController.js";

const router = express.Router();

// get a book
router.get("/:id", getABook);

// get all the books
router.get("/", getBooks);

// get all the books having a term
router.get("/search", getBooksWithTerm);

// get all the books within a price range
router.get("/range", getBooksInRange);

// get all the books with both a term and a price range
router.get("/searchAndRange", getBooksWithTermInRange);

export default router;
