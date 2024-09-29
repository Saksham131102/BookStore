import Book from "../models/bookModel.js";

export const getABook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error in getABook controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log("Error in getBooks controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addBook = async (req, res) => {
  try {
    const { bookName, category, rentPerDay } = req.body;
    // if book already exists
    const bookExists = await Book.findOne({ bookName });
    if (bookExists) {
      return res.status(409).json({ message: "Book already exists" });
    }
    const newBook = new Book({
      bookName,
      category,
      rentPerDay,
    });
    await newBook.save();
    return res.status(201).json(newBook);
  } catch (error) {
    console.log("Error in addBook controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooksWithTerm = async (req, res) => {
  try {
    const { term } = req.body;
    const books = await Book.find({
      $or: [
        { bookName: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
      ],
    });
    if (!books) {
      return res.status(404).json({ error: "Books not found" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.log("Error in getBooksWithTerm controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooksInRange = async (req, res) => {
  try {
    const { min, max } = req.body;
    const books = await Book.find({ rentPerDay: { $gte: min, $lte: max } });
    if (!books) {
      return res.status(404).json({ error: "Books not found" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.log("Error in getBooksInRange controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooksWithTermInRange = async (req, res) => {
  try {
    const { term, min, max } = req.body;
    const books = await Book.find({
      $or: [
        { bookName: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
      ],
      rentPerDay: { $gte: min, $lte: max },
    });

    if (!books) {
      return res.status(404).json({ error: "Books not found" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.log("Error in getBooksWithTermInRange controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
