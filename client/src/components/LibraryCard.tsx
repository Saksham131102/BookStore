import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { IBook } from "@/types";
import useReturnBook from "@/hooks/useReturnBook";

const LibraryCard = ({
  _id,
  bookName,
  category,
  rentPerDay,
  totalRevenue,
}: IBook) => {
  const { returnBook } = useReturnBook();

  return (
    <Card className="mt-3">
      <CardHeader>
        <CardTitle className="text-xl">{bookName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Category: {category}</p>
        <p>
          Rent per day: Rs <span className="text-blue-600">{rentPerDay}</span>
        </p>
        <p>Total Revenue: Rs {totalRevenue}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => returnBook(_id, rentPerDay)}
          variant="outline"
          className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600"
        >
          Return & Pay
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LibraryCard;
