"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Mail, CheckCircle, Lock } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <Mail className="w-16 h-16 mx-auto text-[#FF4500] mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
        <p className="text-gray-600 mb-4">Enter your registered email</p>
        {success ? (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <p>OTP has been sent to your email. Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-[#FF4500] text-white py-2 rounded-md" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
