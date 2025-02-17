"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VendorSignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    businessAddress: "",
    phoneNumber: "",
    businessName: "",
    businessDescription: "",
    location: {
      latitude: "",
      longitude: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Data:", formData); // Debugging log
    
    try {
      setLoading(true); // Show loading state
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Signup Successful:", data);
        setShowSuccess(true);
      } else {
        console.error("Signup Failed:", data);
        alert(data.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      {showSuccess ? (
        <SuccessAlert />
      ) : (
        <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="mb-2 text-center text-4xl font-semibold">Create Vendor Account</h1>
          <p className="mb-8 text-center">
            Already have an account?{" "}
            <Link href="/vendor/login" className="text-[#FF4500] hover:underline">
              Login
            </Link>
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={setFormData} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={setFormData} />
            <InputField label="Email" name="email" value={formData.email} onChange={setFormData} type="email" />
            <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
            <InputField label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={setFormData} />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={setFormData} />
            <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={setFormData} />
            <InputField label="Business Description" name="businessDescription" value={formData.businessDescription} onChange={setFormData} />
            <InputField label="Latitude" name="latitude" value={formData.location.latitude} onChange={setFormData} />
            <InputField label="Longitude" name="longitude" value={formData.location.longitude} onChange={setFormData} />

            <Button type="submit" className="w-full bg-[#FF4500] text-white hover:bg-[#FF4500]/90" disabled={loading}>
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

// ✅ Reusable Input Component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Input name={name} type={type} placeholder={label} value={value} onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))} required />
  </div>
);

// ✅ Success Alert Component
const SuccessAlert = () => (
  <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-80 border border-gray-200">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500">
      <svg
        width="34"
        height="24"
        viewBox="0 0 34 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.97266 11.569L12.7041 20.1107L30.1671 3.02734"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    <h2 className="text-lg font-semibold mt-2">Account Created</h2>
    <p className="text-gray-600 text-center">Your vendor account has been created successfully.</p>
    <Link href="/vendor/login">
      <Button className="mt-4 bg-[#FF4500] text-white w-full rounded-[30px] px-10">GO TO LOGIN</Button>
    </Link>
  </div>
);
