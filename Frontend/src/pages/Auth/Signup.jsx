import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi"; // Consider changing this icon if you prefer
import Input from "../../components/Input";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import AnimatedBackground from "../../components/AnimatedBackground";
import gsap from "gsap";

function Signup() {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

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
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden p-4">
      <AnimatedBackground />
      <div
        ref={formRef}
        className="relative z-10 w-full max-w-sm mx-auto p-8 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md border border-white/60 flex flex-col items-center
                   transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.01]"
      >
        <div className="flex items-center gap-3 mb-4">
          <FiUserPlus className="text-3xl text-indigo-500" />
          <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Create Account
          </h3>
        </div>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Join us and unlock new possibilities
        </p>
        <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
          <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
          <div>
            <label
              className="text-xs text-gray-700 font-semibold mb-1 block"
              htmlFor="signup-fullname"
            >
              Full Name
            </label>
            <Input
              id="signup-fullname"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              placeholder="John Doe"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label
              className="text-xs text-gray-700 font-semibold mb-1 block"
              htmlFor="signup-email"
            >
              Email Address
            </label>
            <Input
              id="signup-email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label
              className="text-xs text-gray-700 font-semibold mb-1 block"
              htmlFor="signup-password"
            >
              Password
            </label>
            <Input
              id="signup-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out text-base mt-4
                       transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-6">Already have an account?</p>
        <Link
          className="text-indigo-600 hover:text-purple-700 font-medium text-sm transition-colors duration-200"
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
