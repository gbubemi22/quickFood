"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import dynamic from "next/dynamic";
import Google from "../../../../public/ic_google.png";

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function VendorSignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    businessName: "",
    businessAddress: "",
    businessDescription: "",
    location: { latitude: null, longitude: null },
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMapSelect = (lat, lng) => {
    setFormData((prev) => ({ ...prev, location: { latitude: lat, longitude: lng } }));
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleChange("location", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Signup Successful:", data);
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
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="mx-auto w-[50%] px-4 py-8 bg-transparent rounded-lg">
        <h1 className="mb-2 text-center text-4xl font-semibold">Vendor Sign Up</h1>
        <p className="mb-8 text-center">
          Already have an account? {" "}
          <Link href="/login" className="text-[#FF4500] hover:underline">Login</Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
          <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
          <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={handleChange} />
          <InputField label="Business Address" name="businessAddress" value={formData.businessAddress} onChange={handleChange} />
          <InputField label="Business Description" name="businessDescription" value={formData.businessDescription} onChange={handleChange} type="textarea" />
          
          <div className="flex flex-col w-[50%] mx-auto gap-5">
            
            <Button type="submit" className="h-12 w-full bg-[#006634] text-base font-semibold hover:bg-[#006634]/90" disabled={loading}>
              {loading ? "Creating Account..." : "CREATE ACCOUNT"}
            </Button>
            <Button variant="outline" className="h-12 w-full bg-white text-base font-semibold">
              <Image src={Google} alt="Google" width={20} height={20} className="mr-2" />
              Signup with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    {type === "textarea" ? (
      <textarea 
        name={name} 
        placeholder={label} 
        value={value} 
        onChange={(e) => onChange(name, e.target.value)} 
        className="w-full p-2 border rounded" 
        required 
      />
    ) : (
      <Input 
        name={name} 
        type={type} 
        placeholder={label} 
        value={value} 
        onChange={(e) => onChange(name, e.target.value)} 
        required 
      />
    )}
  </div>
);
