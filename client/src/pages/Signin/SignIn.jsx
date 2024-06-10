import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth/OAuth";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    if (!signInFormData.email || !signInFormData.password) {
      dispatch(signInFailure("please fill inall fields"));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInFormData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[25%] flex flex-col my-20 justify-center items-center">
        <h1 className="font-bold text-3xl">Sign In</h1>
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
            className="bg-blue-500 text-white font-medium text-lg cursor-pointer rounded-md p-2">
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
