"use client"; 

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

function OtpVerificationContent() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array for 6-digit OTP input
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    if (!email) router.push("/forgotPassword");
  }, [email, router]);

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only keep last digit
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    router.push(`/resetPassword?email=${email}&otp=${enteredOtp}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* OTP Icon */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12" y2="16" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">Verify OTP</h1>
        <p className="text-gray-600 mb-4">Enter the OTP sent to <strong>{email}</strong></p>

        {/* OTP Input */}
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-300 rounded-md transition"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            Verify OTP
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default function OtpVerification() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerificationContent />
    </Suspense>
  );
}
