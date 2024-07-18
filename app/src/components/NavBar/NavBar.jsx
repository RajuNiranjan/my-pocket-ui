import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const path = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="h-14 bg-gray-500 flex  items-center justify-between px-10 sticky top-0 z-50">
      <div>
        <Link to="/">
          <h1 className="font-semibold text-[22px]">
            <span className="text-gray-400">React</span>_
            <span className="text-gray-700">Express</span>
          </h1>
        </Link>
      </div>

      <div className="flex gap-4 font-medium items-center">
        <Link
          to="/"
          className={`${
            path?.pathname === "/"
              ? "text-white font-semibold transition-all duration-500"
              : "text-black transition-all duration-500"
          }`}>
          Home
        </Link>
        <Link
          to="/about"
          className={`${
            path?.pathname === "/about"
              ? "text-white font-semibold transition-all duration-500"
              : "text-black transition-all duration-500"
          }`}>
          About
        </Link>
        {currentUser?.user ? (
          <Link to="/profile">
            <img
              src={currentUser.user.avatar}
              alt="user"
              className={`${
                path.pathname === "/profile" ? "border border-white " : ""
              } w-7 h-7 object-cover rounded-full transition-all duration-300`}
            />
          </Link>
        ) : (
          <Link
            to="/sign_in"
            className={`${
              path?.pathname === "/sign_in"
                ? "text-white font-semibold transition-all duration-500"
                : "text-black transition-all duration-500"
            }`}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
