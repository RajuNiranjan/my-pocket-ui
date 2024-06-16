import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth/OAuth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authSuccess, authFailure, authStart } from "../../redux/Actions/user";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    dispatch(authStart());
    try {
      const res = await axios.post("/api/auth/sign-in", signInFormData);

      if (!signInFormData.email || !signInFormData.password) {
        return dispatch(authFailure(res.message));
      }

      if (res.status !== 200) {
        const errorMessage = res.data.message;
        dispatch(
          authFailure(errorMessage || "Sign In failure, Please try again")
        );
        return;
      }
      const data = res.data;
      dispatch(authSuccess(data));
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(
        authFailure(error.response?.data?.message || "Internal Server Error")
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[25%] flex flex-col my-20 justify-center items-center">
        <h1 className="font-bold text-3xl text-gray-500">Sign In</h1>
        <form
          onSubmit={handleSubmitSignIn}
          className="flex flex-col gap-4 my-10 w-full">
          <input
            name="email"
            value={signInFormData.email}
            type="email"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="Enter email"
            onChange={onChange}
          />
          <input
            name="password"
            value={signInFormData.password}
            type="password"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="********"
            onChange={onChange}
          />
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-300">
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <p>
          Create an account?{" "}
          <Link to="/sign_up">
            <span className="cursor-pointer text-blue-600">Sign Up</span>
          </Link>
        </p>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
