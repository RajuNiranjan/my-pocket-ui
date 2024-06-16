import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex justify-center items-center my-24">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl">
          Welcome Back{" "}
          <span className="font-semibold capitalize">
            {currentUser?.user?.userName}
          </span>
        </h1>

        <form className="flex gap-4 justify-center flex-col w-[450px]">
          <img
            src={currentUser?.user?.avatar}
            alt="alt"
            className="w-24 h-24 rounded-full items-center self-center"
          />

          <input
            type="text"
            placeholder="userName"
            id="userName"
            className="focus:outline-none border border-black rounded-md p-2"
            value={currentUser?.user?.userName}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="focus:outline-none border border-black rounded-md p-2"
            value={currentUser?.user?.email}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="focus:outline-none border border-black rounded-md p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-300">
            Update Infromation
          </button>
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-300">
            Create Listing
          </button>
        </form>
        <div className="flex justify-between">
          <span className="text-red-500 cursor-pointer">Delete Account</span>
          <span className="text-red-500 cursor-pointer">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
