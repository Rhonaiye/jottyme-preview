"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Zustand store
  const { setAuth } = useAuthStore();

  // Google Sign-In simulation
  const handleGoogleSignIn = () => {
    alert("Google Sign-In simulated ✅");
    console.log("Google sign-in clicked");
  };

  // Login API call
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();
      toast.success("Logged in successfully");

      const token = data.data.token
      const user = {
        _id: data.data.user._id,
        email: data.data.user.email,
        firstname: data.data.user.firstname,
        lastname: data.data.user.lastname,
      }
      setAuth(token, user);

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg font-medium border border-gray-200 hover:bg-black/95 hover:opacity-90 ease-in-out duration-300 transition cursor-pointer text-sm md:text-base"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-black text-xs md:text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
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
