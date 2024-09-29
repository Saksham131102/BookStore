import { useAuthContext } from "@/context/authContext";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { IBook } from "@/types";

const useIssueBook = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { authUser, setAuthUser } = useAuthContext();

  const issueBook = async ({
    _id,
    bookName,
    category,
    rentPerDay,
    totalRevenue,
  }: IBook) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/transactions/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: _id, userId: authUser._id }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAuthUser({
        ...authUser,
        BooksIssued: [
          ...authUser.BooksIssued,
          { _id, bookName, category, rentPerDay, totalRevenue },
        ],
      });
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          ...authUser,
          BooksIssued: [
            ...authUser.BooksIssued,
            { _id, bookName, category, rentPerDay },
          ],
        })
      );
      toast.success(`Book issued successfully`, {
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
  return { issueBook, loading };
};

export default useIssueBook;
