import React from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

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

    if (!fullName) {
      setError("Please Enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid Email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");

    // Signup Api Call

    try {
      // upload image if present

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
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full md:ml-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black ">Create an Account</h3>
        <p className="text-xs text-slate-700 me-[5px] mb-6">
          Join us today by entering your details
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setprofilePic} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              label="Full Name"
              placeholder="Ahmady"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              label="Email Address"
              placeholder="John@example.com"
              type="email"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>
          {/* Error message */}
          {error && <p className="text-red-500 text-xs pb-2.5"> {error}</p>}

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <p className="text-md font-extralight text-gray-800 mt-8">
            Already have an account ?
          </p>
          <Link
            className="text-slate-500 underline hover:text-teal-400 text-sm"
            to={"/login"}
          >
            Login
          </Link>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
