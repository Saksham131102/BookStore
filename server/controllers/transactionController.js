import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";

export const issueBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // If user has already borrowed this book
    const transaction = await Transaction.findOne({ bookId, userId });
    if (transaction) {
      return res.status(409).json({ error: "Already borrowed this book" });
    }

    const issueDate = new Date();

    const newTransaction = new Transaction({
      bookId,
      userId,
      issueDate,
    });

    // update user book list
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { BooksIssued: bookId },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // save transaction
    await newTransaction.save();
    return res.status(201).json(newTransaction);
  } catch (error) {
    console.log("Error in addTransaction controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    const transaction = await Transaction.findOne({ bookId, userId });
    if (!transaction) {
      return res.status(404).json({ error: "Book not found" });
    }

    const book = await Book.findById(transaction.bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - transaction.issueDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const totalRentFee = diffDays > 0 ? diffDays * book.rentPerDay : 0;

    // delete transaction
    const deletedTransaction = await Transaction.findByIdAndDelete(
      transaction._id
    );
    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // updating book total revenue
    book.totalRevenue += totalRentFee;
    await book.save();

    // Deleting the book from user collection
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { BooksIssued: bookId },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "Book returned successfully",
      totalRentFee,
    });
  } catch (error) {
    console.log("Error in returnBook controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getPeopleWhoHaveBorrowedABook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const transactions = await Transaction.find({ bookId }).populate("userId");
    if (!transactions) {
      return res.status(404).json({ error: "No transactions found" });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.log(
      "Error in getPeopleWhoHaveBorrowedABook controller",
      error.message
    );
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooksIssuedToAUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).populate("bookId");
    if (!transactions) {
      return res.status(404).json({ error: "No transactions found" });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in getBooksIssuedToAUser controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    if (!transactions) {
      return res.status(404).json({ error: "No transactions found" });
    }
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in getTransactions controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
