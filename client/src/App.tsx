import { Navigate, Route, Routes } from "react-router-dom";

// poppins fonts
import "@fontsource/poppins/300.css"; // Weight 300 (Light)
import "@fontsource/poppins/400.css"; // Weight 400 (Regular)
import "@fontsource/poppins/500.css"; // Weight 500 (Medium)
import "@fontsource/poppins/600.css"; // Weight 600 (Semi-Bold)
import "@fontsource/poppins/700.css"; // Weight 700 (Bold)
import { useAuthContext } from "./context/authContext";
import Login from "./pages/_auth/Login";
import Signup from "./pages/_auth/Signup";
import Home from "./pages/_root/Home";
import { ToastContainer } from "react-toastify";
import Library from "./pages/_root/Library";

function App() {
  const emptyUserId = "";
  const { authUser } = useAuthContext();
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            authUser._id === emptyUserId ? <Navigate to="/login" /> : <Home />
          }
        />
        <Route
          path="/login"
          element={
            authUser._id === emptyUserId ? <Login /> : <Navigate to="/" />
          }
        />
        <Route
          path="/signup"
          element={
            authUser._id === emptyUserId ? <Signup /> : <Navigate to="/" />
          }
        />
        <Route
          path="/library"
          element={
            authUser._id === emptyUserId ? (
              <Navigate to="/login" />
            ) : (
              <Library />
            )
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
