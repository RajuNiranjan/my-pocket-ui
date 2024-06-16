import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../fire_base";
import axios from "axios";
import { authFailure, authStart, authSuccess } from "../../redux/Actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleContinueWithGoogle = async () => {
    dispatch(authStart());
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await axios.post("/api/auth/google", {
        userName: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      });

      const data = res.data;
      dispatch(authSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(authFailure(error.response?.data.message));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleContinueWithGoogle}
        className="bg-red-500 hover:bg-red-600 text-white font-medium text-lg cursor-pointer rounded-md p-2 transition-all duration-500">
        {loading ? "Loading..." : "Continue With Google"}
      </button>
    </>
  );
};

export default OAuth;
