import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import Input from "../../components/Input";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import AnimatedBackground from "../../components/AnimatedBackground";

function Signup() {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) return setError("Please Enter your name");
    if (!validateEmail(email))
      return setError("Please enter a valid Email address");
    if (!password) return setError("Please enter your password");
    setError("");

    try {
      if (profilePic) {
        const imgUloadRes = await uploadImage(profilePic);
        profileImageUrl = imgUloadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 overflow-hidden">
      <AnimatedBackground />
      <div className="w-full max-w-md mx-auto px-3 py-6 sm:p-6 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-md border border-white/40 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <FiUserPlus className="text-2xl text-teal-500" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
            Create an Account
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 text-center">
          Join us today by entering your details
        </p>
        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-2">
          <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
          <label
            className="text-xs text-gray-700 font-medium mb-1"
            htmlFor="signup-fullname"
          >
            Full Name
          </label>
          <Input
            id="signup-fullname"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Ahmady"
            type="text"
            className="mb-1"
          />
          <label
            className="text-xs text-gray-700 font-medium mb-1"
            htmlFor="signup-email"
          >
            Email Address
          </label>
          <Input
            id="signup-email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="John@example.com"
            type="email"
            className="mb-1"
          />
          <label
            className="text-xs text-gray-700 font-medium mb-1"
            htmlFor="signup-password"
          >
            Password
          </label>
          <Input
            id="signup-password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Minimum 8 characters"
            type="password"
            className="mb-1"
          />
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-teal-400 to-blue-400 text-white font-semibold shadow hover:from-teal-500 hover:to-blue-500 transition text-sm mt-2"
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs font-extralight text-gray-800 mt-5">
          Already have an account?
        </p>
        <Link
          className="text-teal-600 underline hover:text-blue-500 text-xs"
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
