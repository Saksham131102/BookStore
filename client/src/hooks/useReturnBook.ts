import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

const useReturnBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { authUser, setAuthUser } = useAuthContext();

  const returnBook = async (bookId: string, rentPerDay: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/transactions/return`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, userId: authUser._id }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAuthUser({
        ...authUser,
        BooksIssued: authUser.BooksIssued.filter((book) => book._id !== bookId),
      });
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          ...authUser,
          BooksIssued: authUser.BooksIssued.filter(
            (book) => book._id !== bookId
          ),
        })
      );
      setLoading(false);
      toast.success(`Book returned successfully & paid Rs ${rentPerDay}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(data);
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
  return { loading, returnBook };
};

export default useReturnBook;
