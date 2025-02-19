"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function OnboardPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const getSignupRoute = () => {
    switch (selectedRole) {
      case "customer":
        return "/signup";
      case "vendor":
        return "/vendor/signup";
      case "admin":
        return "/admin/login";
      default:
        return "#";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-8">How do you want to sign up?</h1>
      <div className="flex flex-col space-y-4 w-full max-w-md">
        {/* Customer Box */}
        <div
          className={`w-full p-4 border-2 rounded-lg cursor-pointer ${
            selectedRole === "customer"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => handleRoleSelection("customer")}
        >
          <h2 className="text-lg font-semibold">Customer</h2>
          <p className="text-sm text-gray-600">Sign up as a customer to order fresh food.</p>
        </div>

        {/* Vendor Box */}
        <div
          className={`w-full p-4 border-2 rounded-lg cursor-pointer ${
            selectedRole === "vendor"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => handleRoleSelection("vendor")}
        >
          <h2 className="text-lg font-semibold">Vendor</h2>
          <p className="text-sm text-gray-600">Sign up as a vendor to sell your products.</p>
        </div>

        {/* Admin Box */}
        <div
          className={`w-full p-4 border-2 rounded-lg cursor-pointer ${
            selectedRole === "admin"
              ? "border-green-600 bg-green-50"
              : "border-gray-200 bg-white"
          }`}
          onClick={() => handleRoleSelection("admin")}
        >
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-sm text-gray-600">Log in as an admin to manage the platform.</p>
        </div>

        {/* Continue Button */}
        <Link href={selectedRole ? getSignupRoute() : "#"}>
          <Button
            className={`w-full py-3 ${
              selectedRole
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            } rounded-lg`}
            disabled={!selectedRole}
          >
            CONTINUE
          </Button>
        </Link>
      </div>
    </div>
  );
}