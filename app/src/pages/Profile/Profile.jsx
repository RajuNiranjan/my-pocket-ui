import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/Actions/user";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../fire_base";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileUploader = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileFormData, setProfileFormData] = useState({
    avatar: currentUser?.user?.avatar || "",
    userName: currentUser?.user?.userName || "",
    email: currentUser?.user?.email || "",
    password: "",
  });

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListing, setShowListings] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [listingLoading, setListingLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileFormData({
        avatar: currentUser.user.avatar,
        userName: currentUser.user.userName,
        email: currentUser.user.email,
        password: "",
      });
    }
  }, [currentUser]);

  const onInputChange = (e) => {
    const { id, value } = e.target;
    setProfileFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileFormData((prev) => ({
            ...prev,
            avatar: downloadURL,
          }));
        });
      }
    );
  };

  const handleSubmitProfileForm = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    try {
      const userId = currentUser?.user?._id;
      const res = await axios.post(
        `/api/user/updateUserInfo/${userId}`,
        profileFormData
      );

      const data = res.data;
      dispatch(updateUserSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.response?.data?.message));
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const userID = currentUser.user._id;
      const res = await axios.delete(`/api/user/deleteUser/${userID}`);
      const data = res.data;
      navigate("/sign_in");
      dispatch(updateUserSuccess(data));
      dispatch(updateUserStart());
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.response?.data.message));
    }
  };

  const handleSignOutAccount = async (e) => {
    e.preventDefault();

    try {
      const res = await axios("/api/auth/sign-out");
      const data = res.data;
      localStorage.clear();
      navigate("/sign_in");

      if (data.success === false) {
        return;
      }
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error.response?.data.message));
    }
  };

  const handleShowListings = async () => {
    setListingLoading(true);
    try {
      const userId = currentUser.user._id;
      const res = await axios.get(`/api/listings/${userId}`);
      setShowListings(!showListing);
      setListingData(res.data.listingdata);
      setListingLoading(false);
    } catch (error) {
      console.log(error);
      setListingLoading(false);
    }
  };

  const deleteListing = async (listingId) => {
    try {
      const res = await axios.delete(
        `/api/listings/deleteListing/${listingId}`
      );
      const data = res.data;

      setListingData((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
      console.log("Listing deleted successfully", data);
    } catch (error) {
      console.log("Error deleting listing", error);
    }
  };

  return (
    <div className="flex justify-center items-center my-24">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl text-center font-bold">Welcome Back</h1>

        <form
          onSubmit={handleSubmitProfileForm}
          className="flex gap-4 justify-center flex-col w-[450px]"
        >
          <input
            type="file"
            hidden
            ref={fileUploader}
            onChange={onImageChange}
          />
          <img
            src={profileFormData.avatar}
            onClick={() => fileUploader.current.click()}
            alt="Profile"
            className="w-24 h-24 rounded-full items-center self-center cursor-pointer object-cover border "
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="userName"
            id="userName"
            className="focus:outline-none border border-black rounded-md p-2"
            value={profileFormData.userName}
            onChange={onInputChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="focus:outline-none border border-black rounded-md p-2"
            value={profileFormData.email}
            onChange={onInputChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="focus:outline-none border border-black rounded-md p-2"
            value={profileFormData.password}
            onChange={onInputChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-300"
          >
            {loading ? "Loading..." : "Update Information"}
          </button>
          <Link
            to="/create-listings"
            type="button"
            className="bg-gray-500 text-center hover:bg-gray-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-300"
          >
            Create Listing
          </Link>
        </form>
        <div className="flex justify-between">
          <span
            onClick={handleDeleteAccount}
            className="text-red-500 cursor-pointer"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOutAccount}
            className="text-red-500 cursor-pointer"
          >
            Logout
          </span>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <button
            onClick={handleShowListings}
            className="cursor-pointer font-bold hover:text-green-500 transition-all duration-500"
          >
            {showListing ? "Hide Listings" : "Show Listings"}
          </button>

          {listingLoading
            ? "Loading..."
            : showListing &&
              listingData.map((item, index) => (
                <div
                  key={index}
                  className="border w-full flex justify-between p-4 rounded-lg shadow-lg items-center "
                >
                  <Link to={`/listings/${item._id}`}>
                    <img
                      src={item.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>

                  <Link to={`/listings/${item._id}`}>{item.name}</Link>
                  <div>
                    <h1
                      onClick={() => deleteListing(item._id)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </h1>
                    <Link
                      to={`/update-listings/${item._id}`}
                      className="text-green-500 cursor-pointer"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
