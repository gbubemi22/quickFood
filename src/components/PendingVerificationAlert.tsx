"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PendingVerificationAlert = () => {
  const router = useRouter();

  const handleRedirectHome = () => {
    router.push("/"); // Redirect to home page or landing page
  };

  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-80 border border-gray-200">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17" cy="17" r="16" stroke="white" strokeWidth="2" />
          <path
            d="M17 8V18L22 14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="text-xl font-semibold mt-4">Pending Verification</h1>
      <p className="text-gray-600 text-center mt-2">
        Your account is awaiting verification. You will be notified about your status soon.
      </p>

      <Button
        className="mt-4 bg-[#FF4500] text-white w-full rounded-[30px] px-10"
        onClick={handleRedirectHome}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default PendingVerificationAlert;
