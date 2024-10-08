import express from "express";

import {
  issueBook,
  returnBook,
  getPeopleWhoHaveBorrowedABook,
  getBooksIssuedToAUser,
  getTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

// get all the transactions
router.get("/", getTransactions);

// get people who have borrowed a book
router.get("/users/:bookId", getPeopleWhoHaveBorrowedABook);

// get books issued to a person
router.get("/books/:userId", getBooksIssuedToAUser);

// Issue a book
router.post("/add", issueBook);

// Return the book
router.delete("/return", returnBook);

export default router;
