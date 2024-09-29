export interface IBook {
  _id: string;
  bookName: string;
  category: string;
  rentPerDay: number;
  totalRevenue: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  BooksIssued: IBook[];
}
