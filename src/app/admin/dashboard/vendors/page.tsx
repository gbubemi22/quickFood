"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PendingVendors } from "@/app/admin/components/pending-vendors";

interface Vendor {
  _id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  block: boolean;
}

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockStatus = async (vendorId: string, isBlocked: boolean) => {
    try {
      const response = await fetch(
        `https://app.quickfoodshop.co.uk/v1/dashboard/block-unblock/${vendorId}`,
        { method: "POST" }
      );
      const result = await response.json();
      if (result.success) {
        setVendors((prev) =>
          prev.map((vendor) =>
            vendor._id === vendorId ? { ...vendor, block: !isBlocked } : vendor
          )
        );
      } else {
        console.error("Failed to update status:", result.message);
      }
    } catch (error) {
      console.error("Error updating vendor status:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Active Vendors</h2>
      {loading ? (
        <p>Loading vendors...</p>
      ) : (
        <table className="min-w-3/4 border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Vendor ID</th>
              <th className="border px-4 py-2">Store Name</th>
              <th className="border px-4 py-2">Contact Person</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Reg Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id} className="text-center">
                <td className="border px-4 py-2">{vendor._id}</td>
                <td className="border px-4 py-2">{vendor.businessName}</td>
                <td className="border px-4 py-2">{vendor.firstName} {vendor.lastName}</td>
                <td className="border px-4 py-2">{vendor.email}</td>
                <td className="border px-4 py-2">{new Date(vendor.createdAt).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  <Button
                    variant={vendor.block ? "outline" : "destructive"}
                    onClick={() => toggleBlockStatus(vendor._id, vendor.block)}
                  >
                    {vendor.block ? "Unblock" : "Block"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <div className="w-[300px] space-y-6">
                  <PendingVendors/>
                </div>
    </div>
  );
}
