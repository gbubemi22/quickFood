"use client";

import { useState } from "react";
import Link from "next/link";
import LocationPicker from "@/components/LocationPicker"; 
import PendingVerificationAlert from "@/components/PendingVerificationAlert"; 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminSignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    businessName: "",
    businessDescription: "",
    businessAddress: "",
    latitude: null as number | null,
    longitude: null as number | null,
  });

  const [loading, setLoading] = useState(false);
  const [showPendingVerification, setShowPendingVerification] = useState(false); // Add state for pending verification
  const [error, setError] = useState("");

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/admin/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful:", data);
        setShowPendingVerification(true); // Show pending verification after successful signup
      } else {
        console.error("Signup Failed:", data);
        alert(data.message || "Signup failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      {showPendingVerification ? (
        <PendingVerificationAlert />
      ) : (
        <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="mb-2 text-center text-4xl font-semibold">Create Vendor Account</h1>
          <p className="mb-8 text-center">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-[#FF4500] hover:underline">
              Login
            </Link>
          </p>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={setFormData} />
            <InputField label="Email" name="email" value={formData.email} onChange={setFormData} type="email" />
            <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={setFormData} />
            <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={setFormData} />
            <InputField label="Business Description" name="businessDescription" value={formData.businessDescription} onChange={setFormData} />
            <InputField label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={setFormData} />
            
            <LocationPicker onLocationSelect={handleLocationSelect} />
            
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
