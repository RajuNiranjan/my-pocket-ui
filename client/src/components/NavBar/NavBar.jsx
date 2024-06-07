import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const path = useLocation();

  const [searchText, setSearchText] = useState("");

  const handleSubmit = () => {
    if (searchText !== "") console.log(searchText);
    setSearchText("");
  };

  const routesData = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "SignIn",
      path: "/sign_in",
    },
  ];

  return (
    <nav className="h-14 bg-gray-500 flex  items-center justify-between px-10">
      <div>
        <Link to="/">
          <h1 className="font-semibold text-[22px]">Estate Real</h1>
        </Link>
      </div>
      <div>
        <div className="flex border border-[#eaeaea] p-1 rounded-full">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none px-1 text-white"
          />
          <button onClick={handleSubmit}>
            <SearchIcon className="text-white " />
          </button>
        </div>
      </div>
      <div className="flex gap-4 font-medium">
        {routesData?.map((item, index) => {
          return (
            <Link
              to={item?.path}
              key={index}
              className={`${
                path?.pathname === item?.path
                  ? "text-white font-semibold transition-all duration-500"
                  : "text-black  transition-all duration-500"
              }`}>
              {item?.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
