"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Mail, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful:", data);
        setShowOtpVerification(true);
      } else {
        setError(data.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      {showOtpVerification ? (
        <OtpVerification email={formData.email} />
      ) : (
        <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="mb-2 text-center text-4xl font-semibold">Create Account</h1>
          <p className="mb-8 text-center">
            Already have an account? {" "}
            <Link href="/login" className="text-[#FF4500] hover:underline">
              Login
            </Link>
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="First Name" name="firstName" value={formData.firstName} onChange={setFormData} />
              <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={setFormData} />
            </div>
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={setFormData} type="tel" />
            <InputField label="Email" name="email" value={formData.email} onChange={setFormData} type="email" />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
            </div>
            <Button type="submit" className="w-full bg-[#FF4500] text-white hover:bg-[#FF4500]/90" disabled={loading}>
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Input name={name} type={type} placeholder={label} value={value} onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))} required />
  </div>
);

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp_token: otp.join("") }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Invalid OTP, please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg text-center">
      <Mail className="w-12 h-12 mx-auto text-[#FF4500]" />
      <h2 className="text-2xl font-semibold mb-4">Check Mail for OTP</h2>
      <p className="text-gray-600 mb-4">Enter the 6-digit code sent to your email.</p>
      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <input key={index} className="border w-10 h-12 text-center text-xl" type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e, index)} />
        ))}
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Button className="mt-4 bg-[#FF4500] text-white w-full" onClick={handleVerifyOtp} disabled={loading}>
        {loading ? "Verifying..." : "CONFIRM"}
      </Button>
      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          <CheckCircle className="w-8 h-8 mx-auto mb-2" />
          <p>Verification Successful! You can now login.</p>
          <Link href="/login" className="mt-2 block text-[#FF4500] font-semibold hover:underline">Go to Login</Link>
        </div>
      )}
    </div>
  );
};
