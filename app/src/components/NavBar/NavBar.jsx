import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const path = useLocation();

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
          <h1 className="font-semibold text-[22px]">
            <span className="text-gray-400">React</span>_
            <span className="text-gray-700">Express</span>
          </h1>
        </Link>
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
