"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Vendor {
  _id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  block: boolean; // true = blocked, false = active
}

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  // Fetch Active Vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("https://app.quickfoodshop.co.uk/v1/dashboard/active-vendors");
        const data = await response.json();
        if (data.success) {
          setVendors(data.data);
        } else {
          console.error("Failed to fetch vendors:", data.message);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Toggle Block/Unblock Vendor
  const toggleBlockStatus = async (vendorId: string) => {
    try {
      setLoading(vendorId); // Show loading state for this vendor
      const response = await fetch(`https://app.quickfoodshop.co.uk/v1/dashboard/block-unblock/${vendorId}`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update status");

      // Update UI after successful toggle
      setVendors((prev) =>
        prev.map((vendor) =>
          vendor._id === vendorId ? { ...vendor, block: !vendor.block } : vendor
        )
      );

      console.log("Status updated:", data);
    } catch (error) {
      console.error("Failed to update status:", error.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Active Vendors</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Vendor ID</th>
            <th className="border p-2">Store Name</th>
            <th className="border p-2">Contact Person</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Registered Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id} className="text-center">
              <td className="border p-2">{vendor._id}</td>
              <td className="border p-2">{vendor.businessName}</td>
              <td className="border p-2">{`${vendor.firstName} ${vendor.lastName}`}</td>
              <td className="border p-2">{vendor.email}</td>
              <td className="border p-2">{new Date(vendor.createdAt).toLocaleDateString()}</td>
              <td className={`border p-2 ${vendor.block ? "text-red-500" : "text-green-500"}`}>
                {vendor.block ? "Blocked" : "Active"}
              </td>
              <td className="border p-2">
                <Button
                  variant={vendor.block ? "default" : "destructive"}
                  onClick={() => toggleBlockStatus(vendor._id)}
                  disabled={loading === vendor._id}
                >
                  {loading === vendor._id ? "Updating..." : vendor.block ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
