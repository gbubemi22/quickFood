"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OnboardPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const getSignupRoute = () => {
    switch (selectedRole) {
      case "order":
        return "/restaurants";
      case "customer":
        return "/signup";
      case "vendor":
        return "/vendor/signup";
      default:
        return "#";
    }
  };

  const roles = [
    { key: "order", label: "Order Now" },
    { key: "customer", label: "Customer" },
    { key: "vendor", label: "Vendor" },
  ];

  return (
    <div className="flex flex-col items-center w-1/2 h-[60%] justify-center  border-2 border-[#C6E3E5] rounded-[30px]">
      <h1 className="text-2xl font-bold mb-8">How do you want to sign up?</h1>
      <div className="flex space-x-4">
        {roles.map(({ key, label }) => (
          <div
            key={key}
            className={`relative flex flex-col items-center justify-center w-36 h-36 border-2 rounded-lg cursor-pointer transition-all 
              ${selectedRole === key ? "border-green-600 bg-green-50" : "border-gray-200 bg-white"}`}
            onClick={() => handleRoleSelection(key)}
          >
            <span className="text-gray-700 font-medium">{label}</span>
            <img
              src={selectedRole === key ? "/check.png" : "/unchecked.png"}
              alt="Checkbox Icon"
              className="absolute top-2 right-2 w-5 h-5"
            />
          </div>
        ))}
      </div>
      <Link href={selectedRole ? getSignupRoute() : "#"}>
        <Button
          className={`mt-6 w-48 py-3 rounded-lg transition-all 
            ${selectedRole ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          disabled={!selectedRole}
        >
          CONTINUE
        </Button>
      </Link>
    </div>
  );
}
