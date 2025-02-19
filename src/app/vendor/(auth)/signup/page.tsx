"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

interface MapComponentProps {
  // other props
  onSelect: (lat: number, lng: number) => void;
}

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

export default function VendorSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    businessAddress: "",
    phoneNumber: "",
    businessName: "",
    businessDescription: "",
    location: { latitude: null as number | null, longitude: null as number | null },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMapSelect = (lat: number, lng: number) => {
    if (lat && lng) {
      setFormData((prev) => ({ ...prev, location: { latitude: lat, longitude: lng } }));
    }
  };
  

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }));
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
      const result = await response.json();
      if (result.success) {
        router.push("/vendor/pending-verification");
      } else {
        alert("Signup failed: " + result.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Vendor Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firstName" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="businessAddress" placeholder="Business Address" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="businessName" placeholder="Business Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="businessDescription" placeholder="Business Description" onChange={handleChange} className="w-full p-2 border rounded"></textarea>

        <div className="flex flex-col gap-3">
          <Button type="button" onClick={useCurrentLocation} className="bg-blue-500 text-white">Use Present Location</Button>
          <MapComponent onSelect={handleMapSelect} />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-green-500 text-white">
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
