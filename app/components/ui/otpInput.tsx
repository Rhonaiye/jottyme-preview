"use client";

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useSignupStore } from '@/store/signup';

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onResend?: () => void;
  onBack?: () => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ 
  length = 6, 
  onComplete = () => {}, 
  onResend = () => {},
  onBack = () => {}
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { email } = useSignupStore()

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) {
      onComplete(combinedOtp);
    }

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      const emptyIndex = otp.indexOf('');
      if (emptyIndex !== -1) inputRefs.current[emptyIndex]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const combinedOtp = otp.join('');
    if (combinedOtp.length === length) {
      onComplete(combinedOtp);
      console.log('Verifying OTP:', combinedOtp);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:pt-14 p-4">
      
      <div className="px-8 w-full ">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Email Verification</h2>
          <p className="text-gray-600 text-sm">
            We sent a verification code to <span className="font-medium">{email}</span>.
          </p>
          <p className="text-gray-600 mt-2 text-sm">Please enter the code below.</p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex gap-3">
            {otp.slice(0, 3).map((value, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-12 text-center text-xl font-semibold text-gray-900 bg-transparent border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                maxLength={1}
              />
            ))}
          </div>
          <div className="flex items-center justify-center w-6 h-14 mx-4">
            <span className="text-gray-400 text-xl font-bold">—</span>
          </div>
          <div className="flex gap-3">
            {otp.slice(3, 6).map((value, index) => (
              <input
                key={index + 3}
                ref={(ref) => (inputRefs.current[index + 3] = ref)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={value}
                onChange={(e) => handleChange(index + 3, e.target.value)}
                onClick={() => handleClick(index + 3)}
                onKeyDown={(e) => handleKeyDown(index + 3, e)}
                className="w-11 h-12 text-center text-xl font-semibold text-gray-900 bg-transparent border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                maxLength={1}
              />
            ))}
          </div>
        </div>

        {/* Verify Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleVerify}
            className="w-[340px] md:w-[440px] bg-[#0C101B] hover:bg-gray-800 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Verify email
          </button>
        </div>

        {/* Resend Link */}
        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm">
            Didn't receive the email?{' '}
            <button
              onClick={onResend}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
            >
              Click to resend
            </button>
          </p>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 mx-auto"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
            Back to Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
