"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VendorRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vendorId = searchParams.get("vendorId");
  const isApproved = searchParams.get("isApproved") === "true";

  useEffect(() => {
    if (!vendorId) {
      router.replace("/vendor/login");
      return;
    }

    const isFirstTimeLogin = localStorage.getItem(`firstTimeLogin_${vendorId}`);

    if (isApproved) {
      if (!isFirstTimeLogin) {
        // First time seeing successful verification
        localStorage.setItem(`firstTimeLogin_${vendorId}`, "true");
        router.replace("/vendor/successful-verification");
      } else {
        // Already approved, go to dashboard
        router.replace("/vendor/dashboard");
      }
    } else {
      // Not approved, go to pending verification
      router.replace("/vendor/pending-verification");
    }
  }, [isApproved, vendorId, router]);

  return null; // This page does not render anything
}
