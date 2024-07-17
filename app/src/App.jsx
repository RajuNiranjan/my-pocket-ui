import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Signin/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import PrivateRouter from "./components/PrivateRoute/PrivateRouter";
import PublicRoute from "./components/PublicRouter/PublicRouter";
import Listings from "./pages/Listings/Listings";
import UPdateListing from "./pages/UpdateListing/UpdateListing";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* PUBLIC ROUTERS */}
        <Route element={<PublicRoute />}>
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
        </Route>

        {/* PRIVATE ROUTERS */}
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/update-listings/:id" element={<UPdateListing />} />
        </Route>

        {/* INCORRECT ROUTER REDIRECTION */}
        <Route path="*" element={<Navigate to="/sign_in" />} />

        {/* NORMAL ROUTER */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
