import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/authContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";
import { ThreeDots } from "react-loader-spinner";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  return (
    <div className="flex justify-between items-center px-40 py-4 font-poppins sticky top-0 w-full bg-[#ababab]">
      <Link to="/" className="text-xl font-semibold">
        Book Store
      </Link>
      <div className="flex items-center">
        <Link
          to="/library"
          className="flex gap-1 items-center transition-all duration-200 hover:bg-slate-300 rounded-full cursor-pointer py-2 px-4"
        >
          <ShoppingCart />
          <div className="p-2 rounded-full w-7 h-7 bg-[#dd0808] flex justify-center items-center">
            <p className="text-md text-white">
              {authUser.BooksIssued?.length || 0}
            </p>
          </div>
        </Link>
        <Avatar className="ml-3 cursor-pointer">
          <AvatarImage src={authUser?.profilePic} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button onClick={logout} className="ml-3 w-20">
          {loading ? (
            <ThreeDots
              height="30"
              width="30"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            "Logout"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
