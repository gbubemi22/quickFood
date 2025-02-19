"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PendingVerificationAlert from "@/components/PendingVerificationAlert"; // Create this component

const VendorLoginPage = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPending, setShowPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if vendor is pending approval
        if (data.status === "pending") {
          setShowPending(true);
        } else {
          // Redirect to the dashboard or home page if approved
          router.push("/dashboard"); // Replace with the actual route
        }
      } else {
        setError(data.message || "Login failed, please try again.");
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
      {showPending ? (
        <PendingVerificationAlert /> // Show pending verification alert if vendor is pending
      ) : (
        <div className="mx-auto max-w-xl px-4 py-8 bg-white shadow-lg rounded-lg">
          <h1 className="mb-2 text-center text-4xl font-semibold">Vendor Login</h1>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={setFormData} />
            <InputField label="Password" name="password" value={formData.password} onChange={setFormData} type="password" />
            <Button type="submit" className="w-full bg-[#FF4500] text-white hover:bg-[#FF4500]/90" disabled={loading}>
              {loading ? "Logging In..." : "LOGIN"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <Input name={name} type={type} placeholder={label} value={value} onChange={(e) => onChange((prev) => ({ ...prev, [name]: e.target.value }))} required />
  </div>
);

export default VendorLoginPage;