"use client";

import Image from "next/image";
import SignupForm from "@/components/ui/signupForm";
import OtpInput from "@/components/ui/otpInput";
import Logo from "@/components/ui/appLogo";
import WorkspaceSetup from "@/components/ui/workspaceSetup";
import { useSignupStore } from "@/store/signup";

export default function SignUpPage() {
  const { step = 1, setStep } = useSignupStore();

  return (
    <div className="flex flex-col lg:flex-row xl:flex-row 2xl:flex-row min-h-screen bg-white">
      {/* Left Panel */}
      <div
        className="
          hidden 
          lg:flex 
          xl:flex 
          2xl:flex 
          flex-1 items-center justify-center text-white py-4 pl-6 2xl:py-8 2xl:pl-6 relative
          max-[1366px]:hidden
          2xl:basis-[55%]
        "
      >
        {/* Card wrapper with white bg corners */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white">
          {/* Noise Background */}
          <Image
            src="/images/nnnoise.svg"
            alt="Background"
            fill
            priority
            className="object-cover z-0"
          />

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-400/20 to-transparent blur-[100px] z-10 pointer-events-none" />
          <div className="absolute top-20 right-0 w-48 h-48 bg-gradient-to-tr from-indigo-300/20 to-transparent blur-[120px] z-10 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-52 h-52 bg-gradient-to-tr from-indigo-500/15 to-transparent blur-[90px] z-10 pointer-events-none" />

          {/* Indigo overlay content */}
          <div className="flex flex-col 2xl:justify-end gap-8 min-h-full min-w-full pt-[30%] 2xl:pt-0 2xl:pb-[15%] relative z-20 items-center">
            <h1 className="text-2xl md:text-3xl xl:text-3xl 2xl:text-[40px] 2xl:mb-5 font-bold text-center">
              Sign up and come on in
            </h1>
            <div className=" ">
              <Image
                src="/images/sign-up.png"
                alt="sign-up image"
                width={500}
                height={500}
                className="2xl:w-[748px] 2xl:h-[485px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center relative overflow-hidden bg-white text-black 2xl:basis-[45%]">
        {/* Top-right gradient streaks */}
        <div className="absolute top-0 right-0 w-14 h-72 bg-gradient-to-tr from-[#822EDECC] to-transparent blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-0 w-12 h-72 bg-gradient-to-br from-[#822EDECC]/40 to-transparent blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div className="absolute top-10 sm:top-12 md:top-14 lg:top-20 xl:top-20 2xl:top-52 left-4 sm:left-6 md:left-8 lg:left-6 xl:left-22 2xl:left-28 z-20 pointer-events-none">
          <div className="block sm:hidden md:hidden lg:block xl:block 2xl:block">
            <Logo />
          </div>
        </div>

        {/* Signup Steps */}
        {step === 1 && <SignupForm handleSignup={() => setStep(2)} />}
        {step === 2 && <OtpInput onBack={() => setStep(1)} />}
        {step === 3 && <WorkspaceSetup />}
      </div>
    </div>
  );
}
