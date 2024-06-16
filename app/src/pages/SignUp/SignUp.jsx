import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth/OAuth";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFailure } from "../../redux/Actions/user";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value,
    });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    dispatch(authStart());
    try {
      const res = await axios.post("/api/auth/sign-up", signUpDetails);
      if (
        !signUpDetails.userName ||
        signUpDetails.email ||
        signUpDetails.password
      ) {
        return dispatch(authFailure(res.message));
      }
      if (res.status !== 201) {
        dispatch(authFailure("Sign Up Failed, Please try again"));
        return;
      }
      const data = res.data;
      dispatch(authSuccess(data));
      setSignUpDetails({
        userName: "",
        email: "",
        password: "",
      });
      navigate("/sign_in");
    } catch (error) {
      console.log(error);
      dispatch(
        authFailure(error.response?.data?.message || "Internal Server Error")
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col my-20 justify-center items-center">
        <h1 className="font-bold text-3xl text-gray-500">Sign Up</h1>
        <form
          onSubmit={handleSubmitSignUp}
          className="flex flex-col gap-4 my-10 w-full">
          <input
            name="userName"
            value={signUpDetails.userName}
            type="text"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="Enter user name"
            onChange={onChange}
          />
          <input
            name="email"
            value={signUpDetails.email}
            type="email"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="Enter email"
            onChange={onChange}
          />
          <input
            name="password"
            value={signUpDetails.password}
            type="password"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="********"
            onChange={onChange}
          />
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-500">
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/sign_in">
            <span className="cursor-pointer text-blue-500">Sign in</span>
          </Link>
        </p>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
