import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Bounce, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import BookCard from "./BookCard";
import { Button } from "./ui/button";
import { IBook } from "@/types";

const Homepage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<IBook[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<IBook[]>([]);
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(100);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = books.filter(
      (book) =>
        book.bookName.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );

    setFilteredBooks(filtered);
  };

  const handleSearchRange = (e: any) => {
    e.preventDefault();

    const filtered = books.filter(
      (book) => book.rentPerDay >= minVal && book.rentPerDay <= maxVal
    );

    setFilteredBooks(filtered);
  };

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/books");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setBooks(data);
        setFilteredBooks(data);
      } catch (error: any) {
        toast.error(`${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center px-36 py-4 bg-white">
        <h1 className="text-xl font-semibold">Books Available</h1>
        <div className="flex w-2/4 gap-3 items-center">
          <p>Range</p>
          <Input
            type="number"
            className="w-20"
            value={minVal}
            onChange={(e) => setMinVal(Number(e.target.value))}
          />
          <Input
            type="number"
            className="w-20"
            value={maxVal}
            onChange={(e) => setMaxVal(Number(e.target.value))}
          />
          <Button onClick={handleSearchRange}>Apply</Button>
          <p className="ml-3">Search</p>
          <Input
            type="text"
            placeholder="search book"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex flex-wrap p-4 gap-2 justify-center">
        {loading ? (
          <ThreeDots
            height="50"
            width="50"
            radius="20"
            color="black"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="h-[70vh] w-screen flex justify-center items-center"
            visible={true}
          />
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              _id={book._id}
              bookName={book.bookName}
              category={book.category}
              rentPerDay={book.rentPerDay}
              totalRevenue={book.totalRevenue}
            />
          ))
        ) : (
          <p className="flex justify-center items-center h-[70vh]">
            No books found
          </p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
