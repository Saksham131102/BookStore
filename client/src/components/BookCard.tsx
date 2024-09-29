import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useAuthContext } from "@/context/authContext";
import useIssueBook from "@/hooks/useIssueBook";
import { IBook } from "@/types";

const BookCard = ({
  _id,
  bookName,
  category,
  rentPerDay,
  totalRevenue,
}: IBook) => {
  const { authUser } = useAuthContext();
  const { issueBook } = useIssueBook();
  const isIssued = authUser.BooksIssued?.find((book) => book._id === _id);

  return (
    <Card className="flex flex-col justify-center items-center w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]">
      <CardHeader>
        <CardTitle className="text-xl">{bookName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-1">
        <p>Category: {category}</p>
        <p>
          Rent per day: Rs <span className="text-blue-600">{rentPerDay}</span>
        </p>
        <p>Total Revenue: Rs {totalRevenue}</p>
      </CardContent>
      <CardFooter>
        {isIssued ? (
          <Button
            disabled
            variant="outline"
            className="hover:text-white hover:bg-black border border-blue-600"
          >
            <span className="text-blue-600">Issued</span>
          </Button>
        ) : (
          <Button
            onClick={() =>
              issueBook({ _id, bookName, category, rentPerDay, totalRevenue })
            }
            variant="outline"
            className="hover:text-white hover:bg-black"
          >
            Issue Book
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
