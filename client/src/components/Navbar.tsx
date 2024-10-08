import { LogOut, Settings2, ShoppingCart, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/authContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useLogout from "@/hooks/useLogout";
import { ThreeDots } from "react-loader-spinner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  return (
    <div className="flex justify-between items-center px-4 md:px-8 lg:px-36 py-4 font-poppins sticky top-0 w-full bg-[#ababab] z-10">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src={authUser?.profilePic} alt="Profile" />
              <AvatarFallback>{authUser?.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-back text-black font-poppins bg-white mr-2">
            <DropdownMenuLabel>{authUser?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator className="border-b border-black" />
            <DropdownMenuGroup>
              <div className="rounded-md">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </div>

              <div className="rounded-md">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings2 className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="border-b border-black" />
            <div onClick={logout} className="rounded-md">
              <DropdownMenuItem className="cursor-pointer">
                {loading ? (
                  <ThreeDots
                    visible={true}
                    width={16}
                    height={16}
                    color="black"
                    ariaLabel="loading"
                    wrapperClass="mr-2"
                  />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                <span>Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
