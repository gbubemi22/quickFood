"use client"; // This directive makes this a client-side component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Use next/navigation for client-side navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  const router = useRouter();
  const email = new URLSearchParams(window.location.search).get("email");
  const otp = new URLSearchParams(window.location.search).get("otp");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!email || !otp) {
      router.push("/forgot-password");
    }
  }, [email, otp, router]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp_token: otp, password }),
    });

    if (response.ok) {
      alert("Password reset successful!");
      router.push("/login");
    } else {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
        <p className="text-gray-600 mb-4">Enter your new password</p>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
