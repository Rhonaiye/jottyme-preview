"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Simulated Google Sign-In
  const handleGoogleSignIn = () => {
    alert("Google Sign-In simulated ✅");
    console.log("Google sign-in clicked");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-4 overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute -left-20 top-0 w-40 md:w-60 h-[20rem] md:h-[32rem] bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 w-40 md:w-60 h-[20rem] md:h-[32rem] bg-pink-400/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-10 bottom-0 w-36 md:w-52 h-[18rem] md:h-[28rem] bg-blue-400/10 rounded-full blur-3xl"></div>

      {/* Brand Logo */}
      <h1 className="text-2xl md:text-3xl text-black font-bold text-center mb-6 z-10">
        Jotty<span className="text-purple-600">me</span>
      </h1>

      {/* Card */}
      <div className="relative w-full max-w-md md:max-w-lg p-5 md:p-6 bg-white rounded-2xl shadow-lg shadow-indigo-600/15 border border-gray-200 z-10">
        {/* Title */}
        <h2 className="text-lg md:text-2xl text-black font-bold mb-2">
          Sign in to your account
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mb-6 text-xs md:text-sm font-extralight">
          Welcome back! Your valuable feedback and feature requests are eagerly
          awaiting your return.
        </p>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer text-sm md:text-base"
        >
          <FcGoogle className="text-lg md:text-xl" /> Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs md:text-sm text-gray-600">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-200 rounded-lg px-3">
            <FiMail className="text-gray-500 text-lg" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 text-base md:text-sm text-black placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-2">
          <div className="flex items-center border border-gray-200 rounded-lg px-3">
            <FiLock className="text-gray-500 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 character password"
              className="w-full p-2 text-base md:text-sm text-black placeholder:text-gray-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-600 transition cursor-pointer"
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-lg" />
              ) : (
                <AiFillEye className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <Link
            href="#"
            className="text-xs md:text-sm text-purple-600 hover:underline font-medium cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button className="w-full bg-black text-white py-2 rounded-lg font-medium border border-gray-200 hover:bg-black/95 hover:opacity-90 ease-in-out duration-300 transition cursor-pointer text-sm md:text-base">
          Sign in
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-black text-xs md:text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="text-purple-600 font-medium hover:underline cursor-pointer"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
