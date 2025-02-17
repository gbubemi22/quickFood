"use client"; // Ensure this is a client-side component

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Use next/navigation for client-side navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function OtpVerificationContent() {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  useEffect(() => {
    if (!email) router.push("/forgotPassword"); // Redirect if no email is provided
  }, [email, router]);

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/resetPassword?email=${email}&otp=${otp}`); // Redirect to Reset Password
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">Enter OTP</h1>
        <p className="text-gray-600 mb-4">Enter the OTP sent to {email}</p>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md">
            Verify OTP
          </Button>
        </form>
      </div>
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
