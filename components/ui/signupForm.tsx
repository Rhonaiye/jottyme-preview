"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useSignupStore } from "@/store/signup";

interface SignupFormProps {
  handleSignup: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, fullName, password, setEmail, setPassword, setFullName } = useSignupStore();

  const handleGoogleSignIn = () => {
    alert("Google Sign-In simulated ✅");
    console.log("Google sign-in clicked");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleSignup();
    } catch (err) {
      console.log(err);
      throw new Error();
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
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 lg:py-2 xl:py-2 2xl:py-2 font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer text-sm md:text-base lg:text-sm xl:text-sm 2xl:text-[18px] mb-6"
        >
          <FcGoogle className="text-lg md:text-xl lg:text-base xl:text-base 2xl:text-[24px]" />{" "}
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

        {/* Full Name Input */}
        <div className="mb-4 lg:mb-3 xl:mb-3 2xl:mb-3">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 lg:py-2 xl:py-2 2xl:py-3">
            <AiOutlineUser className="text-gray-600 text-xl lg:text-lg xl:text-lg 2xl:text-lg" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className="w-full pl-3 text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-[16px] text-black placeholder:text-gray-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4 lg:mb-3 xl:mb-3 2xl:mb-3">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 lg:py-2 xl:py-2 2xl:py-3">
            <FiMail className="text-gray-500 text-lg lg:text-base xl:text-base 2xl:text-base" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-3 text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-[16px] text-black placeholder:text-gray-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-2 lg:mb-1.5 xl:mb-1.5 2xl:mb-1.5">
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 lg:py-2 xl:py-2 2xl:py-3">
            <FiLock className="text-gray-500 text-lg lg:text-base xl:text-base 2xl:text-base" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 8 character password"
              className="w-full pl-3 text-base md:text-sm lg:text-sm xl:text-sm 2xl:text-[16px] text-black placeholder:text-gray-500 outline-none"
              minLength={8}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-600 transition ml-2"
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-lg lg:text-base xl:text-base 2xl:text-base" />
              ) : (
                <AiFillEye className="text-lg lg:text-base xl:text-base 2xl:text-base" />
              )}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-black text-white py-2 lg:py-2.5 xl:py-2.5 2xl:py-3 2xl:text-[18px] rounded-lg font-medium border border-gray-200 hover:bg-black/95 hover:opacity-90 ease-in-out duration-300 transition cursor-pointer text-sm md:text-base lg:text-sm xl:text-sm 2xl:text-sm"
        >
          Sign Up
        </button>

        {/* Sign In Link */}
        <p className="text-center mb-10 text-black text-xs md:text-sm lg:text-md xl:text-md 2xl:text-[14px] mt-6 lg:mt-4 xl:mt-4 2xl:mt-4">
          Already have an account?{" "}
          <Link
            href="#"
            className="text-purple-600 font-medium hover:underline cursor-pointer"
          >
            Sign in here
          </Link>
        </p>

        <p className="mt-10 lg:mt-6 xl:mt-6 2xl:text-[12px] 2xl:mt-6 text-[0.7rem] text-gray-500 font-extralight text-center">
          By creating an account, you agree to the Terms of Service and <br />{" "}
          Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
