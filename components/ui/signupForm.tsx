"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useSignupStore } from "@/store/signup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

interface SignupFormProps {
  handleSignup: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAuth  } = useAuthStore();

  const { email, firstName, lastName, password, setEmail, setPassword, setFirstName, setLastName } =
    useSignupStore();

  const handleGoogleSignIn = () => {
    toast.success("Google Sign-In simulated ✅");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData)
        throw new Error(errorData.message || "Signup failed");
      }

      const resData = await res.json();
      const userData = {
        firstname: resData.data.user.firstname,
        lastname: resData.data.user.lastname,
        email: resData.data.user.email,
        _id: resData.data.user._id,
      }
      setAuth(resData.data.token, userData);

      toast.success("Account created successfully 🎉");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center lg:mt-10 min-h-screen 2xl:min-h-[80%] bg-transparent max-sm:px-4 overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md md:max-w-md 2xl:max-w-[70%] mt-6 lg:mt-4 xl:mt-4 2xl:mt-4"
      >
        <h2 className="text-lg md:text-2xl lg:text-[1.3rem] xl:text-[1.3rem] 2xl:text-[28px] text-black font-bold mb-2 text-left">
          Create your new account
        </h2>
        <p className="text-gray-600 mb-6 text-xs md:text-sm lg:text-xs xl:text-xs 2xl:text-[14px] font-extralight text-left">
          Start your free 10-day trial and start collecting feedback. Easy to
          collect user feedback & feature requests.
        </p>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer text-sm md:text-base lg:text-sm xl:text-sm 2xl:text-[18px] mb-6"
        >
          <FcGoogle className="text-lg md:text-xl lg:text-base xl:text-base 2xl:text-[24px]" />
          Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6 lg:my-4 xl:my-4 2xl:my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs md:text-sm lg:text-xs xl:text-xs 2xl:text-[16px] text-gray-600">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* First + Last Name */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <AiOutlineUser className="text-gray-600 text-xl" />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full pl-3 text-sm text-black placeholder:text-gray-500 outline-none"
              required
            />
          </div>
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <AiOutlineUser className="text-gray-600 text-xl" />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full pl-3 text-sm text-black placeholder:text-gray-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <FiMail className="text-gray-500 text-lg" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-3 text-sm text-black placeholder:text-gray-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-2">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2">
            <FiLock className="text-gray-500 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 character password"
              className="w-full pl-3 text-sm text-black placeholder:text-gray-500 outline-none"
              minLength={8}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500 hover:text-gray-600 transition"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-black text-white py-2 rounded-lg font-medium border border-gray-200 hover:bg-black/95 hover:opacity-90 transition cursor-pointer text-sm disabled:opacity-50"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Sign In Link */}
        <p className="text-center mb-10 text-black text-xs md:text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-purple-600 font-medium hover:underline cursor-pointer"
          >
            Sign in here
          </Link>
        </p>

        <p className="mt-10 text-[0.7rem] text-gray-500 font-extralight text-center">
          By creating an account, you agree to the Terms of Service and <br />
          Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
