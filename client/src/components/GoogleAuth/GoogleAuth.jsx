import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const results = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/googleAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: results.user.displayName,
          email: results.user.email,
          photo: results.user.photoURL,
        }),
      });

      const data = await res.json();
      navigate("/");
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("error occured in google sign_up", error);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className="bg-red-500 text-white font-medium text-lg cursor-pointer rounded-md p-2">
      Continue With Google
    </button>
  );
};

export default GoogleAuth;
