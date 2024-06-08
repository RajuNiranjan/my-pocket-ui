import { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onChnage = (e) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value,
    });
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    console.log(signUpDetails);
    setSignUpDetails({
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[25%] flex flex-col my-20 justify-center items-center">
        <h1 className="font-bold  text-3xl">Sign Up</h1>
        <form
          onSubmit={handleSubmitSignUp}
          className="flex flex-col gap-4 my-10 w-full ">
          <input
            name="userName"
            value={signUpDetails.userName}
            type="text"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="enter user name"
            onChange={onChnage}
          />
          <input
            name="email"
            value={signUpDetails.email}
            type="email"
            className="focus:outline-none border border-black rounded-md  p-2"
            placeholder="enter email"
            onChange={onChnage}
          />
          <input
            name="password"
            value={signUpDetails.password}
            type="password"
            className="focus:outline-none border border-black rounded-md p-2"
            placeholder="********"
            onChange={onChnage}
          />
          <button
            // onClick={handleSubmitSignUp}
            type="submit"
            className="bg-blue-500 text-white font-medium text-lg cursor-pointer rounded-md p-2">
            Sing Up
          </button>
          <p>
            already have an account?{" "}
            <Link to="/sign_in">
              <span className="cursor-pointer text-blue-600">singin</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
