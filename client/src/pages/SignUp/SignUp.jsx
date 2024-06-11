import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../../components/OAuth/OAuth";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    // Validation
    if (
      !signUpDetails.userName ||
      !signUpDetails.email ||
      !signUpDetails.password
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign_up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpDetails),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Something went wrong");
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign_in");
      setSignUpDetails({
        userName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[25%] flex flex-col my-20 justify-center items-center">
        <h1 className="font-bold text-3xl">Sign Up</h1>
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
            className="bg-blue-500 text-white font-medium text-lg cursor-pointer rounded-md p-2">
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
          {/* <GoogleAuth /> */}
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/sign_in">
            <span className="cursor-pointer text-blue-600">Sign in</span>
          </Link>
        </p>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
