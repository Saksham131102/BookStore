import LibraryCard from "@/components/LibraryCard";
import Navbar from "@/components/Navbar";
import { useAuthContext } from "@/context/authContext";

const Library = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Navbar />
      <div className="p-10">
        {authUser.BooksIssued.length > 0 ? (
          authUser.BooksIssued.map((book) => (
            <LibraryCard
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
    </>
  );
};

export default Library;
