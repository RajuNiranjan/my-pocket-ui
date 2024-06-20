import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.user ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default PrivateRouter;
